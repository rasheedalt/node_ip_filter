const app = require('./src/server');
import { port } from './config/endpoint.config';

app.listen(port, () => console.log(`app is started on port ${port}`))