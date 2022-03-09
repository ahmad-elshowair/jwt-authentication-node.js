import express, { Request, Response, Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rate_limit from 'express-rate-limit';

// initialize port variable
const PORT = 8000;

// declare an instance of express
const app: Application = express();

// declare the limitations of requests
const limiter = rate_limit({
    windowMs: 15 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'you have requested a lot, in 15 mins you can try again',
});

// use the limiter for all requests
app.use(limiter);

// use middleware of parsing incoming request
app.use(express.json());

// use the http logger middleware of morgan with common argument
app.use(morgan('common'));

// use Helmet to secure my express
app.use(helmet());

// add get request with the route /
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hey There !' });
});

// add post request
app.post('/', (req: Request, res: Response) => {
    res.json({
        message: 'hi from post request',
        data: req.body,
    });
});

// start the express server
app.listen(PORT, () => {
    console.log(`the server works on http://localhost:${PORT}`);
});

// export the app
export default app;
