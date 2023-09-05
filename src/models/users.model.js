import { DataTypes } from "sequelize";
import db from "../utils/database.js";

const User = db.define('users', {
    //Definir todos los atributod / columnas de la tabla.
    // Vamos a definir: id, username, email, password
    // id int [pk, increment]

    id:{
        //tipo de dato
        type: DataTypes.INTEGER,
        //Llave primaria (pk)
        primaryKey: true,
        //Autoincrementación
        autoIncrement: true,
    },
    //username varchar(30) [not null]
    username:{
        type: DataTypes.STRING(30),
        allowNull:false,
    },
    //email varchar(50)[not null]
    email: {
        type: DataTypes.STRING(50),
        allowNull:false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default User;