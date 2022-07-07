export const loacalsMiddleware = (req,res,next) => {
    res.locals.loggedInUser = req.session.user;
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Dotube"
    res.locals.siteName = "Dotube"
    
    next();
}