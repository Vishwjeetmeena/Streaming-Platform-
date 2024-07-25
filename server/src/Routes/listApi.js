import listSchema from "../Database/models/listSchema.js";
import authorization from "../middleware/authorisation.js";
import express from "express";
const route = express.Router();

route.post("/", authorization, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({message: "Adminstrative permission required",success: false });
        }
        const newList = req.body;
        await listSchema.create(newList);
        res.status(200).json({message: "List added successfully",success: true});
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//DELETE

route.delete("/:title", authorization, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({message: "Adminstrative permission required",success: false });
        }
        const listTitle = req.params.title;
        const list = await listSchema.destroy({
            where: {
                title: listTitle
            }
        });
        if (list === 0) {
            return res.status(404).json({ message: "List not found", success: false });
        }
        res.status(200).json({message: "List Deleted successfully",success: true});
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//GET

route.get("/", authorization, async (req, res) => {
    const typeQuery = req.query.type;
    const categoryQuery = req.query.category;
    try {
        let whereClause = {};
        if (typeQuery) {
            whereClause.type = typeQuery;
        }
        if (categoryQuery) {
            whereClause.category = categoryQuery;
        }

        const lists = await ListSchema.findAll({
            where: whereClause,
            order: Sequelize.literal('random()'),
            limit: 10
        });

        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = route;
