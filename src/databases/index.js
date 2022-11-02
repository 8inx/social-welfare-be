import mongoose from 'mongoose';

import logger from '@utils/logger';
import { DB_URI } from '@config';

const connect = async () => {
  try {
    await mongoose.connect(DB_URI);
    logger.info('Connected to database');
  } catch (error) {
    logger.error('Could not connect to database');
    process.exit(1);
  }
};

export default connect;
