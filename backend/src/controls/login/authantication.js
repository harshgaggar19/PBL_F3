import User from '../../model/User.schema.js';
async function authantication(req, res) {
    const {phone,password}=req.body;
    console.log(phone,password);
    const user=await User.findOne({phone:phone});
    console.log(user);
    if(user.clerkid==req.password)
    {
        res.json({message:"Success"});
    }
    else{
        res.json({message:"Failed"});
    }
}
export default authantication;
