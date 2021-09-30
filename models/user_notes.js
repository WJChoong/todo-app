const User = require("./user");
const Notes = require("./note");

module.exports = function (sequelize, Sequelize) {
    const {INTEGER} = Sequelize
    let user_notes = sequelize.define('user_notes', {
        user_notes_id:{
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    }, {
        underscored: true,
    });

    user_notes.associate = (models) => {
        user_notes.belongsTo(models.users);
        user_notes.belongsTo(models.notes);
    };

    return user_notes;
};