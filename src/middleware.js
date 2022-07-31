import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
    }
})


const s3ImageUploader = multerS3({
    s3:s3,
    bucket: "dotubee/images",
    acl: "public-read",
})

const s3VideoUploader = multerS3({
    s3:s3,
    bucket: "dotubee/videos",
    acl: "public-read",
})

export const loacalsMiddleware = (req, res, next) => {
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

export const publicOnlyMiddleware = (req, res, next) => {
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
    },
    storage:s3ImageUploader 
})

export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: { 
        fileSize: 20000000,
    },
    storage: s3VideoUploader 
})