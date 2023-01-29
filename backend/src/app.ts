import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { hashSync, compareSync } from 'bcrypt';
import { User, Sensor, Data } from './types';
import { logger } from './middleware/logger';
const { db } = require('./databases/connect.js');
const app: Application = express();

app.use(express.json());
app.use(cors());

//app.use(logger);

app.post('/login', async (req: Request, res: Response) => {
	const Members: User[] = await db.query(`select * from users where name = $1 order by id desc`, [req.body.name]).then((res: any, err: any) => {
		if (err) throw err;
		return res.rows;
	});

	if (Members.length > 0) {
		Members.forEach((member) => {
			if (member.name === req.body.name && compareSync(req.body.password, member.password)) {
				return res.sendStatus(200);
			} else {
				return res.status(401).send({ msg: 'Password incorrect' });
			}
		});
	} else {
		return res.status(401).send({ msg: 'User Not Found' });
	}
});
app.post('/signup', async (req: Request, res: Response) => {
	const newMember = {
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
	};
	const Members: User[] = await db.query(`select * from users order by id desc`).then((res: any, err: any) => {
		if (err) throw err;
		return res.rows;
	});
	if (newMember.password != req.body.confirm_password) return res.status(401).send({ msg: 'Password and confirm password are not the same' });
	if (!newMember.name || !newMember.email) return res.status(401).send({ msg: 'Please include a name and email' });
	if (Members.length > 0) {
		const ExitingName = Members.map((m) => m.name != newMember.name);
		const ExitingEmail = Members.map((m) => m.email != newMember.email);
		if (ExitingEmail && ExitingName) {
			let hashPassword = hashSync(newMember.password, 10);
			db.query(`insert into users (name, password, email) values ($1,$2,$3)`, [newMember.name, hashPassword, newMember.email]);
			return res.sendStatus(200);
		} else return res.status(401).send({ msg: 'Name or Email already taken' });
	}
});

app.post('/data/:id', (req: Request, res: Response) => {
	const newData = {
		id: req.params.id,
		temperature: req.body.temp,
		Humidity: req.body.hum,
		date: Date.now(),
	};
	db.query(`insert into data (sensor_id, temperature, humidity, mesured_at) values ($1,$2,$3,$4)`, [newData.id, newData.temperature, newData.Humidity, newData.date]);
	return res.sendStatus(200);
});
app.post('/createSensor', async (req: Request, res: Response) => {
	console.log(req.body);
	const Sensors: Sensor[] = await db.query(`select * from sensor`).then((res: any, err: any) => {
		if (err) throw err;
		return res.rows;
	});

	const newSensor = {
		id: req.body.id,
		name: req.body.name,
		longitude: req.body.longitude,
		latitude: req.body.latitude,
	};
	if (Sensors.length > 0) {
		Sensors.forEach((sensor: Sensor) => {
			if (newSensor.id === sensor.id) {
				return res.status(401).send({ msg: 'Sensor already exist' });
			} else {
				db.query(`insert into sensor (id,sensor_name, longitude, latitude) values ($1,$2,$3,$4)`, [newSensor.id, newSensor.name, newSensor.longitude, newSensor.latitude]);
				return res.sendStatus(200);
			}
		});
	} else {
		db.query(`insert into sensor (id,sensor_name, longitude, latitude) values ($1,$2,$3,$4)`, [newSensor.id, newSensor.name, newSensor.longitude, newSensor.latitude]);
		return res.sendStatus(200);
	}
});
app.put('/updateSensor/:id', async (req: Request, res: Response) => {
	const sensor: Sensor[] = await db.query(`select * from sensor where id = $1`, [req.params.id]);
	const newSensor = {
		id: req.params.id,
		name: req.body.name,
		longitude: req.body.longitude,
		latitude: req.body.latitude,
	};
	if (newSensor.id === JSON.stringify(sensor[0].id)) {
		db.query(`update sensor set sensor_name = $1 , longitude = $2 , latitude = $3 where id = $4`, [newSensor.name, newSensor.longitude, newSensor.latitude, newSensor.id]);
		return res.sendStatus(200);
	} else {
		return res.status(401).send({ msg: 'Sensor not found' });
	}
});
app.delete('/deleteSensor/:id', async (req: Request, res: Response) => {
	const sensor: Sensor[] = await db.query(`select * from sensor where id = $1`, [req.params.id]);
	if (sensor.length <= 0) return res.status(401).send({ msg: 'Sensor not Found' });
	else {
		db.query(`delete from sensor where id = $1`, [req.params.id]);
		return res.sendStatus(200);
	}
});
app.get('/lastreport/:id', async (req: Request, res: Response) => {
	const data: Data[] = await db.query(`select * from data where sensor_id = $1 order by id desc limit 1`, [req.params.id]);
	return res.send(data).status(200);
});

app.get('/graphreport/:id', async (req: Request, res: Response) => {
	const data: Data[] = await db.query(`select * from data where sensor_id = $1 order by id desc limit 35`, [req.params.id]);
	return res.send(data).status(200);
});

app.get('/dayreport/:id', async (req: Request, res: Response) => {
	const data: Data[] = await db.query(`select * from data where sensor_id = $1 order by id desc limit 288`, [req.params.id]);
	return res.send(data).status(200);
});

app.get('/sensor', async (req: Request, res: Response) => {
	const data: Sensor[] = await db.query(`select * from sensor`);
	return res.send(data).status(200);
});

app.get('/sensorPosition/:id', async (req: Request, res: Response) => {
	const Position: Number[] = await db.query(`select longitude, latitude from sensor where id = $1`, [req.params.id]);
	return res.send(Position).status(200);
});

app.listen(5000, () => console.log('server running'));
