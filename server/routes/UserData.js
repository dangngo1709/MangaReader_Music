import express from "express";
import bcrypt from 'bcrypt'
import User from '../model/User_model.js'
import MangaPage from '../model/MangaPage_model.js'
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const app = express();
const generateHash = async (plaintext) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plaintext, salt);
    return hash;
}
router.post("/mangadb/updateComment", async (req, res) => {
    const { id, comment, mangaPageId } = req.body;
    const modify = await MangaPage.updateOne(
        {
            manga_id: mangaPageId,
            "comments.id": id,
        },
        {
          $set: { 
            "comments.$.comment": comment
          },
        }
      );
      console.log(modify)
      console.log(id)
      console.log(mangaPageId)
    if(modify){
        res.json({status: 'true',})
    } else {
        res.json({status: 'error'})
    }
  });
  
  
  
  router.post("/mangadb/createMangaPage", async(req,res) => {
    try {
        if(req.body){
            const page = await MangaPage.create({
                manga_id: req.body.id,
                comments: []
            })
            if (body) {
                return res.json({ status: 'ok', user: true});
            } else {
                return res.json({ status: "ok", user: false});
            }
        }
    }catch(err){
        res.json({status: "error"})
    }
})
router.post("/mangadb/getMangaPage", async(req,res) => {
    const page = await MangaPage.findOne({
        manga_id: req.body.id
    })
    if(page){
        res.json({status: 'true', mangapage: page})
    } else {
        res.json({status: 'error'})
    }
})
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

router.get("/mangadb/getUser", async(req,res) => {
    const user = await User.findOne({
        email: req.session.userEmail
    })
    if(user){
        res.json({status: 'true', user: user})
    } else {
        res.json({status: 'error'})
    }
})
router.post("/mangadb/deleteComment", async (req, res) => {
    const { id, mangaPageId } = req.body;
    const modify = await MangaPage.updateOne(
        {
            manga_id: mangaPageId,
        },
        {
          $pull: { comments: {
            id: id
          }},
        }
      );
      console.log(modify)
      console.log(id)
      console.log(mangaPageId)
    if(modify){
        res.json({status: 'true',})
    } else {
        res.json({status: 'error'})
    }
  });
router.post("/mangadb/addComment", async(req,res) => {
    const modify = await MangaPage.updateOne(
        {
            manga_id: req.body.id,
        },
        {
          $push: { comments: req.body.commentObject},
        }
      );
    if(modify){
        res.json({status: 'true',})
    } else {
        res.json({status: 'error'})
    }

})

router.get("/mangadb/getAboutMe", async(req,res) => {
    const user = await User.findOne({
        email: req.session.userEmail
    })
    if(user){
        res.json({status: 'true', aboutMe: user.aboutMe})
    } else {
        res.json({status: 'error'})
    }
})
router.get("/mangadb/getUserName", async(req,res) => {
    const user = await User.findOne({
        email: req.session.userEmail
    })
    if(user){
        res.json({status:'true', UserName: user.name})
    } else {
        res.json({status: 'error'})
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
router.delete('/mangadb/delete', async(req,res) => {
    const deleted = await User.findOneAndRemove({
        email: req.session.userEmail
    })
    if(deleted){
        res.send({status: 'true'});
    } else {
        res.send({status: 'error'});
    }
})
export default router;