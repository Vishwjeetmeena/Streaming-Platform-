import { DataTypes, Sequelize } from "sequelize";
import { mysequelize } from "../config/config.js";

const userSchema = mysequelize.define("users", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
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

userSchema.sync({ alter: true }).then(() => {
    console.log("User Model synced");
});

export default userSchema;