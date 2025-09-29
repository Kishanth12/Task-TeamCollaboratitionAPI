import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    activity: {
      type: String,
      enum: ["created", "updated", "commented", "reassigned"],
      required: true,
    },
  },
  { timestamps: true }
);

const Log = mongoose.models.Log || mongoose.model("Log", logSchema);

export default Log;
