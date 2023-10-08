import { Request, Response, NextFunction} from 'express';
import moment from 'moment';


export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next()
}