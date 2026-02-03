import mongoose from "mongoose";

const { Schema } = mongoose;


const ActivitySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    action: String, // LOGIN, CREATE_USER, DELETE_USER
    ip: String
  },
  { timestamps: true }
);

export default mongoose.model("Activity", ActivitySchema);
