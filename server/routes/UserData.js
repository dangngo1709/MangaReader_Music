import express from "express";
import bcrypt from 'bcrypt'
import User from '../model/User_model.js'
const router = express.Router();

const generateHash = async (plaintext) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plaintext, salt);
    return hash;
}

router.get("", (res,req) => {
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
        const id = await generateHash(user.email + user.password);
        if (match) {
            return res.json( {status: "ok", user: true, sessionID: id} )
        } else {
            return res.json( {status: "ok", user: false})
        }
    }catch(err){
        res.json({ status: "error"})
    }
})
export default router;