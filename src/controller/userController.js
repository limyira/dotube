import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";



export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
    const { name, username, email, location, password } = req.body;
    const user = await User.create({
        name,
        username,
        email,
        location,
        password,
    })
    console.log(user);
    return res.redirect("/");
}
export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "login" })
}
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    if (!user) {
        return res.status(400).redirect("/login", { pageTitle: "Login" })
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", { pageTitle: "Wrong password" })
    }
    req.session.user = user;
    req.session.loggedIn = true;
    return res.redirect("/");
}
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
}























