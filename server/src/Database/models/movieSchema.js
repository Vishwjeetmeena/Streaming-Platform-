import { DataTypes, Sequelize } from "sequelize";
import { mysequelize } from "../config/config.js";

const movieSchema = mysequelize.define("movies", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
    },
    img: {
        type: DataTypes.STRING
    },
    trailer: {
        type: DataTypes.STRING
    },
    video: {
        type: DataTypes.STRING
    },
    isSeries: {
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

movieSchema.sync({ alter: true }).then(() => {
    console.log("Movies Model synced");
});

export default movieSchema;