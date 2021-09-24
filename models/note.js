module.exports = (sequelize, DataTypes) => {
    const {INTEGER, STRING, DATE} = DataTypes
    let notes = sequelize.define('notes', {
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
            allowNull: false,
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

    // notes.associate = (models) => {
    //     notes.hasMany(models.user_notes);
    // }

    return notes;
};