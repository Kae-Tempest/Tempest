import express, { Application, Request, Response, NextFunction} from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {

})
app.get('/Login', (req: Request, res: Response) => {

})
app.post('/signup', (req: Request, res: Response) => {

})
app.get('/SensorDetails/:id', (req: Request, res: Response) => {
    
})

app.listen(5000, () => console.log('server running'))