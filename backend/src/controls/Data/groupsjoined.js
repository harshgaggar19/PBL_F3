import roomUser from '../../model/room.schema.js'
import Chat from '../../model/chat.schema.js';
import User from '../../model/User.schema.js' 

export async function groupsjoined(req, res) {
    console.log("Groups joined");
    const {phone}=req.query;
    try{
        const user=await User.findOne({phone:phone});
        if(!user) throw 1;
        const rooms = await Promise.all(
            user.rooms.map(async (el) => {
                const room = await roomUser.findOne({ roomId: el });
                return { name: room.name, roomId: el };
            })
        );
        console.log(rooms);
        res.json({rooms:rooms,userId:user._id,phone:phone});
    }
    catch(e)
    {
        console.log("Not able to find");
    }
}
