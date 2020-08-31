import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import authRoutes from './authRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(routes);

app.use("/files", express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.listen(3333, () => {
  console.log('Application started');
})
