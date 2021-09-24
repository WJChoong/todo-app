// const UserModel = (sequelize, Sequelize) => {
//     const {INTEGER, STRING, DATE} = Sequelize
//     const Users = sequelize.define('users',{
//         user_id: {
//             type: INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         email: {
//             type: STRING,
//             allowNull: false,
//         },
//         update_at: {
//             type: DATE,
//             allowNull: false,
//         },
//         created_at: {
//             type: DATE,
//             allowNull: false,
//         },
//         status: {
//             type: STRING,
//             allowNull: false,
//         },
//     })
//     return Users;
// }
//
// module.exports = UserModel

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
    }, {
        underscored: true,
        // tableName: 'users'
    });
    //
    // User.associate = (models) => {
    //     User.hasMany(models.user_notes)
    // }

    return User;
};