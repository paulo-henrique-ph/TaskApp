import { connect } from 'mongoose';
import { mongoDb } from '../../config/databases';

connect(mongoDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
