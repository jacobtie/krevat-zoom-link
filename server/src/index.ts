import express from 'express';
import cors from 'cors';
import loginRouter from './routes/login';
import meetingRouter from './routes/meeting';
import healthRouter from './routes/health';

const app = express();

app.enable('trust proxy');

if (process.env.NODE_ENV === 'local') {
  app.use(cors());
}

// Force HTTPS redirect when not on localhost
if (process.env.NODE_ENV !== 'local') {
  app.use((req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  });
}

app.use(express.json());

app.use('/health', healthRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/meeting', meetingRouter);

app.use(express.static('client'));

app.listen(process.env.PORT, () => console.log('Server listening on', process.env.PORT));
