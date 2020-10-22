import app from './app';
import routes from './routes';

app.use('/api/v1/', routes);

app.listen(3333);
