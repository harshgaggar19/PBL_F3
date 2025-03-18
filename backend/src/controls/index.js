
import './Chat/websocket.js';
import express from 'express';
const app=express();
const router=express.Router();
import cors from 'cors';
import mongoose from "mongoose";
import createaccount  from "./login/createaccount.js";
import  authantication  from "./login/authantication.js";
import dotenv from 'dotenv';
// import { adduser } from './Room/adduser.js';
import { makeGroup } from './Room/makeGroup.js';
import { groupsjoined } from './Data/groupsjoined.js';
import { getChat } from './Data/getChat.js';
import { getRoomName } from './Data/getroomid.js';
import { sendMessage } from './Chat/chat.js';
import { findmatch } from './Route/findmatch.js';

dotenv.config();

app.use(cors({ origin: '*' })); // Allow all origins during development
async function connectDatabase()
{
    try{
    const res=await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}/${process.env.DB}`);
    console.log("Connected");
    }
    catch(e)
    {
        console.log("Unable to connect with Database");
    }
}
connectDatabase();
app.use(express.json());
router.post('/signup',createaccount);
router.post('/login',authantication);
router.post('/makegrp',makeGroup);
// router.post('/add',adduser);
router.get('/groupsjoin',groupsjoined);
router.get('/getdata',getChat);
router.get('/getroomname',getRoomName);
router.post('/ride',findmatch);
app.use(router);
app.listen(3000,'0.0.0.0');

