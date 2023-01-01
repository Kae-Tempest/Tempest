import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { hashSync, compareSync } from 'bcrypt';
import { User, Sensor } from './types';
import { logger } from './middleware/logger';

const { db } = require('./databases/connect.js');
const app: Application = express();
app.use(express.json());
app.use(cors());

//app.use(logger);

app.post('/login', async (req: Request, res: Response) => {
	const Members: User[] = await db.query(`select * from users where name = ? order by id desc`, [req.body.name]);
	if (Members.length === 0) return res.status(401).send({ msg: 'Name doesn\'t existe' });
	let MemberFound = false
	Members.forEach((member) => {
		if (member.name === req.body.name && compareSync(req.body.password, member.password)) {
			return MemberFound = true
		} else {
			return MemberFound = false
		}
	});
	if(MemberFound) {
		res.sendStatus(200);}
	else {
		res.status(401).send({ msg: 'Password incorrect' });
	}
});
app.post('/signup', async (req: Request, res: Response) => {
	const newMember = {
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
	};
	const Members: User[] = await db.query(`select * from users order by id desc`);

	Members.forEach((member) => {
		if (member.name == newMember.name || member.email == newMember.email) return res.status(401).send({ msg: 'Name or Email already taken' });
		if (req.body.password != req.body.confirm_password) return res.status(401).send({ msg: 'Password and confirm password are not the same' });
		if (!newMember.name || !newMember.email) return res.status(401).send({ msg: 'Please include a name and email' });
	});

	let hashPassword = hashSync(newMember.password, 10);
	db.query(`insert into users (name, password, email) values ('${newMember.name}', '${hashPassword}', '${newMember.email}')`);
	res.status(400);
});

app.post('/data/:id', (req: Request, res: Response) => {
	const newData = {
		id: req.params.id,
		temperature: req.body.temp,
		Humidity: req.body.hum,
		date: Date.now(),
	};
	db.query(`insert into data (sensor_id, temperature, humidity, mesured_at) values (${newData.id}, ${newData.temperature}, ${newData.Humidity}, ${newData.date})`);
	return res.send(200);
});
app.post('/createSensor', async (req: Request, res: Response) => {
	const Sensors = await db.query(`select * from sensor`);
	const newSensor = {
		id: req.body.id,
		name: req.body.name,
		longitude: req.body.longitude,
		latitude: req.body.latitude,
	};
	Sensors.forEach((sensor: Sensor) => {
		if (newSensor.id === sensor.id) {
			return res.status(401).send({ msg: 'Sensor already exist' });
		} else {
			db.query(`insert into sensor (id,sensor_name, longitude, latitude) values (${newSensor.id},'${newSensor.name}',${newSensor.longitude}, ${newSensor.latitude})`);
			return res.status(200);
		}
	});
});

app.get('/report/:id', async (req: Request, res: Response) => {
	const data = await db.query(`select * from data where sensor_id = ${req.params.id}`);
	return res.send(data).status(200);
});

app.get('/sensor', async (req: Request, res: Response) => {
	const data = await db.query(`select * from sensor`);
	return res.send(data).status(200);
});

app.get('/sensorPosition/:id', async (req: Request, res: Response) => {
	const Position = await db.query(`select longitude, latitude from sensor where id = ${req.params.id}`);
	return res.send(Position).status(200);
});

app.listen(5000, () => console.log('server running'));
