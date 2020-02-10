import express, { json } from 'express';
import './db/mongoose';
import userRouter from './routes/user';
import taskRouter from './routes/task';

const app = express();

app.use(json());
app.use(userRouter);
app.use(taskRouter);

export default app;
