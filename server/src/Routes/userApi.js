import userSchema from "../Database/Models/userSchema.js";
import express from "express";
import authorization from "../middleware/authorisation.js";

const route = express.Router();

route.delete("/delete", authorization, async (req, res) => {
    const email = req.user.email;
    try {
        const result = await userSchema.destroy({
            where: {
                email: email
            }
        });

        if (result === 0) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ message: "Oops, something went wrong", success: false });
    }
});
//route for user profile
//route for user update
export default route;
