import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Timeline } from "../models/timelineSchema.js";

export const postTimeline = catchAsyncError(async (req, res, next) => {
  const { title, discription, from, to } = req.body;
  const newtimeline = await Timeline.create({
    title,
    discription,
    timeline: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "Timeline Added",
    newtimeline,
  });
});

export const deleteTimeline = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("TimeLine not Found!", 404));
  }
  await timeline.deleteOne();
  res.status(200).json({
    success: true,
    message: "Timeline Deleted! ",
  });
});

export const getAllTimeline = catchAsyncError(async (req, res, next) => {
  const timelines = await Timeline.find();
  res.status(200).json({
    success: true,
    timelines,
  });
});
