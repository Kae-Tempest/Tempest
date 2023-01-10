"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = require("bcrypt");
const { db } = require('./databases/connect.js');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//app.use(logger);
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Members = yield db.query(`select * from users where name = ? order by id desc`, [req.body.name]);
    let MemberFound = false;
    Members.forEach((member) => {
        if (member.name === req.body.name && (0, bcrypt_1.compareSync)(req.body.password, member.password)) {
            return (MemberFound = true);
        }
        else {
            return (MemberFound = false);
        }
    });
    if (MemberFound) {
        res.sendStatus(200);
    }
    else {
        res.status(401).send({ msg: 'Password incorrect' });
    }
}));
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newMember = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    };
    const Members = yield db.query(`select * from users order by id desc`);
    Members.forEach((member) => {
        if (member.name == newMember.name || member.email == newMember.email)
            return res.status(401).send({ msg: 'Name or Email already taken' });
        if (req.body.password != req.body.confirm_password)
            return res.status(401).send({ msg: 'Password and confirm password are not the same' });
        if (!newMember.name || !newMember.email)
            return res.status(401).send({ msg: 'Please include a name and email' });
    });
    let hashPassword = (0, bcrypt_1.hashSync)(newMember.password, 10);
    db.query(`insert into users (name, password, email) values (?,?,?)`, [newMember.name, hashPassword, newMember.email]);
    res.sendStatus(200);
}));
app.post('/data/:id', (req, res) => {
    const newData = {
        id: req.params.id,
        temperature: req.body.temp,
        Humidity: req.body.hum,
        date: Date.now(),
    };
    db.query(`insert into data (sensor_id, temperature, humidity, mesured_at) values (?,?,?,?)`, [newData.id, newData.temperature, newData.Humidity, newData.date]);
    return res.send(200);
});
app.post('/createSensor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Sensors = yield db.query(`select * from sensor`);
    const newSensor = {
        id: req.body.id,
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    };
    Sensors.forEach((sensor) => {
        if (newSensor.id === sensor.id) {
            return res.status(401).send({ msg: 'Sensor already exist' });
        }
        else {
            db.query(`insert into sensor (id,sensor_name, longitude, latitude) values (?,?,?,?)`, [newSensor.id, newSensor.name, newSensor.longitude, newSensor.latitude]);
            return res.status(200);
        }
    });
}));
app.put('/updateSensor/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sensor = yield db.query(`select * from sensor where id = ?`, [req.params.id]);
    const newSensor = {
        id: req.params.id,
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    };
    if (newSensor.id === JSON.stringify(sensor[0].id)) {
        db.query(`update sensor set sensor_name = ? , longitude = ? , latitude = ? where id = ?`, [newSensor.name, newSensor.longitude, newSensor.latitude, newSensor.id]);
        return res.sendStatus(200);
    }
    else {
        return res.status(401).send({ msg: 'Sensor not found' });
    }
}));
app.get('/report/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db.query(`select * from data where sensor_id = ?`, [req.params.id]);
    return res.send(data).status(200);
}));
app.get('/sensor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db.query(`select * from sensor`);
    return res.send(data).status(200);
}));
app.get('/sensorPosition/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Position = yield db.query(`select longitude, latitude from sensor where id = ?`, [req.params.id]);
    return res.send(Position).status(200);
}));
app.listen(8080, () => console.log('server running'));
