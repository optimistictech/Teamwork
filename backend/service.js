import config from 'dotenv';
import app from './app';

config.config();
const port = process.env.PORT || 8000;

app.listen(port, () => console.log('Started Services'));

export default app;
