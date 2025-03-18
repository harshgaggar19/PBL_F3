import roomUser from '../../model/room.schema.js'
import User from '../../model/User.schema.js' 
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

dotenv.config();
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

export async function makeGroup(req, res) {
    try{
    await connectDatabase();
    // Generate a unique room ID
    const {users,name,creator}=req.body;
    console.log(users,name,creator);
    users.push(creator);
    console.log(users);
    let phone;
    const roomId = uuidv4();
    console.log("Hello");
    for(phone of users)
    {
        
        const userid=await User.findOne({phone:phone});
            if(!userid) continue;
            let rooms=userid.rooms;
            rooms.push(roomId);
            rooms = [...new Set(rooms)];
            await User.updateOne({phone:phone},{$set :{rooms:rooms}});
            
    }
    
    const room=new roomUser({
        name:name,
      roomId:roomId,
      users:users 
    })
    room.save();
    res.json({roomId:roomId});

    }
    catch(e)
    {
        console.log(e);
        res.json({message:"User not available"});
    }
}
