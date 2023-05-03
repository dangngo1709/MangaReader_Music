import express from "express";
import bcrypt from 'bcrypt'
import User from '../model/User_model.js'
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const app = express();
const generateHash = async (plaintext) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plaintext, salt);
    return hash;
}
router.post("/mangadb/profileAboutMe", async(req,res) => {
    try{
        const user = await User.updateOne({
            email: req.body.email
        }, {
            $set: {
                "aboutMe": req.body.text
            }
        })
    }catch(err){
        return res.json({ status: 'error'})
    }
})

router.get("/mangadb/getAboutMe", async(req,res) => {
    const user = await User.findOne({
        email: req.session.userEmail
    })
    if(user){
        res.json({status: 'true', aboutMe: user.aboutMe})
    } else {
        res.json({status: 'error', reason: 'User not logged in'})
    }
})

router.get("", async (req,res) => {
    return req.json({status: 'mangadb'});
})

router.post("/mangadb/register", async (req,res) => {
    try {
        if(req.body){
            const hashPass = await generateHash(req.body.user_pass);
            const user = await User.create({
                name: req.body.user_name,
                email: req.body.user_email,
                password: hashPass
            })
            if (user) {
                return res.json({ status: 'ok', user: true});
            } else {
                return res.json({ status: "ok", user: false});
            }
        }
    }catch(err){
        res.json({status: "error"})
    }
})
router.post("/mangadb/login", async (req,res) => {
    try{
        const user = await User.findOne({
            email: req.body.user_email
        })
        const match = await bcrypt.compare(req.body.user_pass, user.password);
        const id = user.email;
        req.session.userEmail = req.body.user_email;
        if (match) {
            return res.json( {status: "ok", user: true, sessionID: id} )
        } else {
            return res.json( {status: "ok", user: false})
        }
    }catch(err){
        res.json({ status: "error"})
    }
})
router.get("/mangadb/logout", (req,res) => {
    req.session.destroy();
    res.send({status: 'success'})
})
export default router;