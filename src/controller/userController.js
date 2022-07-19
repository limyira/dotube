import User from "../models/User";
import mongoose from "mongoose";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import Video from "../models/Video";



export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
    const { name, username, email, location, password } = req.body;
    const user = await User.create({
        name,
        username,
        email,
        location,
        password,
        socialOnly: false,
    })
    return res.redirect("/");
}
export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "login" })
}
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({ username, socialOnly: false })
    if (!user) {
        return res.status(400).render("login", {
            pageTitle, errorMessage: "An account with this username does not exists.",
        })
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", { pageTitle, errorMessage: "Wrong password" })
    }
    req.session.user = user;
    req.session.loggedIn = true;
    return res.redirect("/");
}
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
}


export const startGithub = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: "fbd8388f53636c8d86d7",
        allow_signup: false,
        scope: "read:user user:email",
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}
export const finishGithub = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: "fbd8388f53636c8d86d7",
        client_secret: "5d0568d568e37e56f100473995cff4b90f612ba9",
        code: req.query.code,
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const requestToken = await (await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json"
        }
    })).json();
    if ("access_token" in requestToken) {
        const { access_token } = requestToken;
        const apiUrl = "https://api.github.com/user"
        const userData = await (await fetch(apiUrl, {
            headers: {
                Authorization: `token ${access_token}`,
            }
        })).json();
        const emailData = await (await fetch(`${apiUrl}/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
            }
        })).json();
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!emailObj) {
            return res.redirect("/");
        }
        let user = await User.findOne({ email: emailObj.email });
        if (!user) {
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                email: emailObj.email,
                locaiton: userData.locaiton,
                username: userData.login,
                password: "",
                socialOnly: true,
            })
        } else {
            req.session.user = user;
            req.session.loggedIn = true;
            return res.redirect("/");
        }
    } else {
        return res.redirect("/");
    }
}

export const getEditProfile = (req, res) => {
    return res.render("edit-profile", { pageTitle: "Edit-Profile" });
}

export const postEditProfile = async (req, res) => {
    const {
        session:
        { user: { _id, avatarUrl } },
        body: { username, name, location, email },
        file,
    } = req;
    const updateUser = await User.findByIdAndUpdate(_id, {
        avatarUrl: file ? file.path : avatarUrl,
        name,
        email,
        username,
        location,
    }, { new: true });
    req.session.user = updateUser;
    return res.redirect("/");
}

export const getChangePassword = async (req, res) => {
    if (req.session.user.socialOnly === true) {
        return res.redirect("/");
    }
    return res.render("chpassword", { pageTitle: "Change password" });
}

export const postChangePassword = async (req, res) => {
    const id = req.session.user._id
    const body = { oldpassword, newpassword, newpassword2 } = req;
    const user = await User.findById(id);
    const ok = await bcrypt.compare(oldpassword, user.password);
    if (!ok) {
        return res.status(400).render("chpassword", { pageTitle: " Change Password ", errorMessage: "The current password is incorrect" });
    }
    if (newpassword !== newpassword2) {
        return res.status(400).render("chpassword", { pageTitle: "Change Password", errorMessage: "The password does not match the comfirmation" });
    }
    user.password = newpassword;
    await user.save();
    return res.redirect("/users/logout");

}


export const see = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate({
        path: "videos",
        populate: {
            path: "owner",
            model: "User",
        },
    });
    if (!user) {
        return res.status(404).render("404", { pageTitle: "User not found." });
    }
    return res.render("profile", {
        pageTitle: user.name,
        user,
    });
};
















