import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 4 },
    videoUrl: {type: String, required: true},
    thumbUrl: {type: String, required: true},
    description: { type: String, required: true, minlength: 6 },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String }],
    meta: {
        views: { type: Number, default: 0, required: true },
    },
    owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"User" },
    comments: [{type: mongoose.Schema.Types.ObjectId, required: true, ref:"Comment"}],
});


videoSchema.static("formatHashtags", function (hashtags) {
    return hashtags.split(",").map((word) => word.startsWith("#") ? word : `#${word}`);
})

const Video = mongoose.model("Video", videoSchema);
export default Video;