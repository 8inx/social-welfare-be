import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import { PORT, NODE_ENV } from '@config';
import connect from '@databases';
import logger from '@utils/logger';
import swaggerDocs from '@utils/swagger';

import { errorConverter, errorHandler } from '@middlewares/error';
import authRoute from '@routes/auth.route';
import userRoute from '@routes/user.route';

const app = express();

/* middlewares */
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());

/* routes */
app.use('/auth', authRoute);
app.use('/users', userRoute);

/* start docs */
if (NODE_ENV === 'development') {
  swaggerDocs(app);
}

/* error handling */
app.use(errorConverter);
app.use(errorHandler);

/* server start */
app.listen(PORT, async () => {
  logger.info(`App running at port ${PORT}`);
  await connect();
});
