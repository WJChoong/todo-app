const User = require("./user");
const user_notes = require("./user_notes");

module.exports = (sequelize, DataTypes) => {
    const {INTEGER, STRING, DATE} = DataTypes
    let Notes = sequelize.define('notes', {
        note_id:{
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: STRING,
            allowNull: false,
        },
        deleted_at:{
            type: DATE,
            allowNull: true,
        },
        updated_at: {
            type: DATE,
            allowNull: true,
        },
        status: {
            type: STRING,
            allowNull: false,
        },
    }, {
        underscored: true,
        paranoid:true,
        tableName: 'notes'
    });

    Notes.associate = (models) => {
        // console.log(models);
        // Notes.hasMany(models.users);
        Notes.belongsToMany(
            models.users, {
            through: models.user_notes
        })
    };

    return Notes;
};