import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './connectDB';
import adminRoute from './routes/admin_route';
import volunteerRoute from './routes/volunteer_route';
import clientRoute from './routes/client_route';
import authRoute from './routes/auth_route';

dotenv.config();

// Express setup
export const app: Express = express();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const port = process.env.PORT;

// Add this middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

app.use('/admin', adminRoute);
app.use('/volunteer', volunteerRoute);
app.use('/client', clientRoute);
app.use('/auth', authRoute);

connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
