import multer from "multer";
export const loacalsMiddleware = (req,res,next) => {
    res.locals.loggedInUser = req.session.user || {};
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Dotube"
    next();
}


export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not authorized")
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) =>{
    if (!req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not authorized")
        return res.redirect("/");
    }
}

export const uploadImg = multer({
    dest: "uploads/avatar/",
    limits: {
        fileSize: 10000000,
    } 
});

export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: { 
        fileSize: 20000000,
    }
})