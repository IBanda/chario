import mongoose from 'mongoose';

try {
  mongoose.connect('mongodb://localhost:27017/charioDB', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  });
} catch (error) {
  process.exit(1);
}

mongoose.connection.on('error', (error) => {
  console.error(error);
});
