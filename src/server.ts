import express, { Request, Response, Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rate_limit from 'express-rate-limit';
import errorMiddleware from './middlewares/error';
import config from './config/config';
import routes from './routes';

// initialize port variable
const port = config.port;

// declare an instance of express
const app: Application = express();

// declare the limitations of requests
const limiter = rate_limit({
    windowMs: 15 * 60 * 1000,
    max: 20,
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

app.use(routes);

// add get request with the route /
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hey There main server!' });
});

// error middleware
app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'you got lost dude ! ',
    });
});
// start the express server
app.listen(port, () => {
    console.log(`the server works on http://localhost:${port}`);
});

// export the app
export default app;
