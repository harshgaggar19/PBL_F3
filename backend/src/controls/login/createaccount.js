import User from '../../model/User.schema.js';
import { z } from 'zod';

async function createAccount(req, res) {
    const { name, phone, email, id, latitude, longitude } = req.body;
    console.log(name, phone, email, id, latitude, longitude);

    const userSchema = z.object({
        name: z.string().min(1).max(30),
        phone: z.string().length(10).regex(/^\d+$/),
        email: z.string().email(),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
    });

    try {
        const user = { 
            name, 
            phone, 
            email, 
            clerkId: id,
            currentLocation: {
                type: "Point",
                coordinates: [longitude, latitude]  // GeoJSON format [longitude, latitude]
            }
        };

        userSchema.parse({ name, phone, email, clerkId: id, latitude, longitude });
        
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: "Phone number already registered" });
        }

        const validated = new User(user);
        await validated.save();
        
        const fetchUser = await User.findOne({ phone });
        res.json({ message: "Success", user: fetchUser.id });
        console.log("Success");
    } catch (e) {
        res.status(400).json({ message: "Failed", error: e.errors || e.message });
    }
}

export default createAccount;
