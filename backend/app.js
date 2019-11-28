import exp from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import artRoute from './routes/article';
import gifRoute from './routes/gif';
import useRoute from './routes/user';
import feedRoute from './routes/feed';
import { getTags } from './controllers/feed';
import auth from './middlewares/auth';

const app = exp();


app.use(exp.static(path.join(__dirname, 'public')));
// app.use('/uploads', exp.static('uploads'));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/v1/articles', artRoute);
app.use('/api/v1/gifs', gifRoute);
app.use('/api/v1/auth', useRoute);
app.use('/api/v1/feed', feedRoute);

app.get('/api/v1/tags', auth, getTags);

module.exports = app;
