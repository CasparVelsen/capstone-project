import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema(
  {
    name: { type: String },
    username: { type: String },
    password: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('User', schema);
