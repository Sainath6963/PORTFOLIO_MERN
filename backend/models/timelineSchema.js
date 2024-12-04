import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required!"],
  },
  discription: {
    type: String,
    required: [true, "Discription Required!"],
  },
  timeline: {
    from: {
      type: String,
      required: [true, "Timeline starting date is Required"],
    },
    to: String,
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
