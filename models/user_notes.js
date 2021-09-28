module.exports = function (sequelize, Sequelize) {
    const {INTEGER} = Sequelize
    let user_notes = sequelize.define('user_notes', {
        user_id: {
            type: INTEGER,
            allowNull: false,
        },
        notes_id: {
            type: INTEGER,
            allowNull: false,
        },
    }, {
        underscored: true,
    });

    // user_notes.associate = (models) => {
    //     user_notes.belongsTo(models.user, {
    //         foreignKey: {
    //             name: "user_id",
    //         }
    //     });
    //     user_notes.belongsTo(models.note, {
    //         foreignKey: {
    //             name: "user_id",
    //         }
    //     });
    // };

    return user_notes;
};