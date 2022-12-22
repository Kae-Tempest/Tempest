import express, { Application, Request, Response, NextFunction } from 'express';
import { hashSync, compareSync } from 'bcrypt';
import { User, Sensor } from './types';
//import { logger } from './middleware/logger';

const { db } = require('./databases/connect.js');
const app: Application = express();
app.use(express.json());

//app.use(logger);

app.get('/login', async (req: Request, res: Response) => {
	const Members: User[] = await db.query(`select * from members order by id desc`);
	Members.forEach((member) => {
		if (member.name != req.body.name && compareSync(req.body.password, member.password)) {
			return res.send('200');
		} else return res.send('400');
	});
});
app.post('/signup', async (req: Request, res: Response) => {
	const newMember = {
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
	};

	const Members: User[] = await db.query(`select * from members order by id desc`);

	Members.forEach((member) => {
		if (member.name == newMember.name || member.email == newMember.email) return res.status(400).json({ msg: 'Name or Email already taken' });
	});

	if (req.body.password != req.body.confirm_password) return res.status(400).json({ msg: 'Password and confirm password are not the same' });

	if (!newMember.name || !newMember.email) return res.status(400).json({ msg: 'Please include a name and email' });

	let hashPassword = hashSync(newMember.password, 10);
	db.query(`insert into members (name, password, email) values (${newMember.name}, ${hashPassword}, ${newMember.email})`);
	res.redirect('/');
});

app.post('/data/:id', (req: Request, res: Response) => {
	const newData = {
		id: req.params.id,
		temperature: req.body.temp,
		Humidity: req.body.hum,
		date: Date.now(),
	};
	db.query(`insert into data (sensor_id, temperature, humidity, mesured_at) values (${newData.id}, ${newData.temperature}, ${newData.Humidity}, ${newData.date})`);
	return res.send('200');
});

app.get('/sensor/:id', async (req: Request, res: Response) => {
	const data = await db.query(`select * from data where sensor_id = ${req.params.id}`);
	console.log(data);
	return res.send(data).status(200);
});

app.get('/sensorPosition/:id', async (req: Request, res: Response) => {
	const Position = await db.query(`select longitude, latitude from sensor where id = ${req.params.id}`);
	return res.send(Position).status(200);
});

app.post('/createSensor/:id', async (req: Request, res: Response) => {
	const Sensors = await db.query(`select * from sensor`);

	const newSensor = {
		id: req.params.id,
		name: req.body.name,
		longitude: req.body.longitude,
		latitude: req.body.latitude,
	};

	Sensors.forEach((sensor: Sensor) => {
		if (newSensor.id === sensor.id) {
			return res.send({ msg: 'Sensor already exist' }).status(400);
		} else {
			db.query(`insert into sensor (sensor_name, longitude, latitude) values (${newSensor.name} ${newSensor.longitude}, ${newSensor.latitude})`);
		}
	});
	res.send({ msg: 'Sensor Added' }).status(200);
});

app.listen(5000, () => console.log('server running'));
