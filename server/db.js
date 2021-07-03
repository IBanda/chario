import mongoose from 'mongoose';
import logger from 'loglevel';

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .catch((error) => {
    logger.error(error.message);
    process.exit(1);
  });

mongoose.connection.on('error', (error) => {
  logger.error(error.message);
});
