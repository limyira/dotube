import Video from "../models/Video";
import User from "../models/User";


export const trending = async (req, res) => {
  const videos = await Video.find({}).sort({createdAt: "desc"}).populate("owner");
  return res.render("home", {pageTitle: "home", videos});
}
export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle: "upload"})
}

export const postUpload = async (req, res) => {
  const {title, hashtags, description } = req.body;
  const {user: {_id}} = req.session;
  const {file} =req;
  const video = await Video.create({
    title,
    description,
    videoUrl: file.path,
    owner:_id,
    hashtags: Video.formatHashtags(hashtags),
    createdAt: Date.now(),
    meta: {
      views: 0,
      rating: 0,
    },
  })
  const user = await User.findById(_id);
  user.videos.push(video._id);
  user.save();
  console.log(video)
  
  return res.redirect("/");
}

export const watch = async (req, res) => {
  const {id} = req.params;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.status(404).redirect("/");
  }
  return res.render("watch", {pageTitle: "Watch", video});

}
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const { user: {_id}} =  req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", {pageTitle: "Video not found"})
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: "Edit Video", video });
}

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, hashtags, description} = req.body;
  const { user: {_id}} =  req.session;
  const video = await Video.exists({_id: id});
  if (!video) {
    return res.render("404", {pageTitle: "Video not found"})
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id,{
    title,
    hashtags: Video.formatHashtags(hashtags),
    description,
  })
  return res.redirect(`/videos/${id}`);
}

export const deleteVideo = async (req, res) => {
  const {id} = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
}
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      }
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
}