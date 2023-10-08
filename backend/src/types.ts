export type User = {
	id: number;
	name: string;
	password: string;
	email: string;
};

export type Data = {
	temperature: string;
	Humidity: string;
	date: Date;
	sensor_id: number;
};

export type Sensor = {
	id: string;
	sensor_name: string;
	longitude: number;
	latitude: number;
};
