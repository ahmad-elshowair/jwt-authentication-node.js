import express, { Request, Response, Application } from 'express';

// initialize port variable
const PORT = 8000;

// declare an instance of express
const app: Application = express();

// add get request with the route /
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hey There !' });
});

// start the express server

app.listen(PORT, () => {
    console.log(`the server works on http://localhost:${PORT}`);
});
