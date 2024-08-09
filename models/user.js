import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  journal: [entrySchema],
});

const User = mongoose.model('User', userSchema);

export default User;