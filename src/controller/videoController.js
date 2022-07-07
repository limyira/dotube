import Video from "../models/Video";


export const trending = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", {pageTitle: "home", videos});
}
export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle: "upload"})
}

export const postUpload = async (req, res) => {
  const {title, hashtags, description } = req.body;
  const video = await Video.create({
    title,
    hashtags,
    description,
    createdAt: Date.now(),
    meta: {
      views: 0,
      rating: 0,
    },
  })
  return res.redirect("/");
}

export const watch = async (req, res) => {
  const {id} = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).redirect("/");
  }
  return res.render("watch", {pageTitle: "Watch", video});

}
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};