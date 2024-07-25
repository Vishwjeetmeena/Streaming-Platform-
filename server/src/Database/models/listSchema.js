import { DataTypes, Sequelize} from "sequelize";
import { mysequelize } from "../config/config.js";

const listSchema = mysequelize.define("list", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING
    },
    category:{
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    }
});

listSchema.sync({ alter: true }).then(() => {
    console.log("List Model synced");
});

export default listSchema;