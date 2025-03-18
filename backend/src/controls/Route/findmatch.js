import Passenger from '../../model/ride.schema.js';

export async function findmatch(req, res) {
    try {
        const { userId, name, currentLocation, source, destination, waypoints } = req.body;

        if (!userId || !name || !currentLocation || !source || !destination) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Save the new passenger ride request
        const newPassenger = new Passenger({
            userId,
            name,
            currentLocation,
            source,
            destination,
            waypoints: waypoints || [],
            lastUpdated: new Date()
        });

        await newPassenger.save();

        // Retrieve the matched user for this userId (if already matched)
        const matchedUser = await Passenger.findOne({ userId }).select("matchedPassenger");

        res.status(201).json({
            message: "Ride request created successfully",
            passenger: newPassenger,
            matchedUser: matchedUser?.matchedPassenger || "No matched user found"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
