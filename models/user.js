// const Notes = require("./note");
// const user_notes = require("./user_notes");

module.exports = function (sequelize, Sequelize) {
    const {INTEGER, STRING, DATE} = Sequelize
    let User = sequelize.define('users', {
        user_id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: STRING,
            allowNull: false,
            required: true
        },
        email: {
            type: STRING,
            allowNull: false,
            len:[7, 100],
            isEmail:true
        },
        password: {
            type: STRING,
            allowNull: false,
            len:[7, 100]
        },
        deleted_at:{
            type: DATE,
            allowNull: true,
        },
        status: {
            type: STRING,
            allowNull: false,
        },
        // associate:(models) => {
            
        // }

    }, {
        underscored: true,
        // tableName: 'users'
    });
    
    User.associate = (models) => {
        User.belongsToMany(models.notes, {
            through: models.user_notes
        });
        User.hasMany(models.user_notes);
    }

    return User;
};