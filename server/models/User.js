import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password_digest: { type: String, required: true, select: false },
  dog: { type: Schema.Types.ObjectId, ref: "dogs", required: false }

  // select will not send pw
});

export default mongoose.model("user", UserSchema);
