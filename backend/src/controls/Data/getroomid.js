import roomUser from '../../model/room.schema.js' 

export async function getRoomName(req,res) {
    const {roomId}=req.query;
    try{
    const chat=await roomUser.findOne({roomId:roomId});
    res.json({name:chat.name});
    }
    catch(e)
    {
        res.json("Failed");
    }

}