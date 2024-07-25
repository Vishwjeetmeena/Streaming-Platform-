import userSchema from "../Database/Models/userSchema";
import authorization from "../middleware/authorisation.js";
import e from "express";
const route = e.Router();

route.get("/",authorization,async(req,res)=>{
    try {
        if(!req.user.isAdmin) throw new Error("Not an Admin");
        const admins = await userSchema.findAll({
            where:{
                isAdmin: true
            }
        })
        res.status(200).json({message: admins, success: true});
    } catch (error) {
        res.json({message: error.message, success: false});
    }
})

route.patch("/",authorization,async(req,res)=>{
    try {
        if(req.user.isAdmin === false) throw new Error("Not an Admin");
        const email = req.body.email;
        await userSchema.update({isAdmin: true},{
            where:{
                email: email
            }
        })
        res.status(200).json({message: `${email} is added as admin`, success: true});
    } catch (error) {
        res.json({message: error.message, success: false});
    }
});


export default route;