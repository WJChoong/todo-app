const { DataSource } = require('apollo-datasource');
const {users} = require('../models');

class UserAPI extends DataSource {
    // constructor() {
    //     super();
    //     const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    //         dialect: 'mysql',
    //         host: config.db.host,
    //     });
    //     this.database = sequelize
    // }

    initialize(config) {
        this.context = config.context;
    }

    // Register User
    async addNewUser(name, email, password) {
        const userCreate = await users.create({ 
            name: name,
            email: email,
            password: password,
            status: "A"
        });
        
        if (userCreate){
            return "User had registered";
        }
        return "Failed to register user";
        
    }

    // Login
    async loginUser(userEmail, userPassword) {
        const { rows } = await users.findAndCountAll({
            where: {
              "email": userEmail,
              "password": userPassword
            },
        });
        console
        if (rows){
            return "Login Successfully";
        }
        return "Fail to login";
    }

    // change Password
    async editUser(userEmail, userNewPassword ) {
        // users.update(
        //     { password: userNewPassword },
        //     { where: {email: userEmail} }
        // ).then(content => {
        //     console.log("Successfully updated");
        //     return "Successfully updated";
        // }).catch(err => {
        //     console.log('error: ' + err);
        //     return "Failed to update password";
        // });
        const userUpdate = users.update(
            { password: userNewPassword },
            { where: {email: userEmail} }
        )
        if (userUpdate){
            return "Successfully updated";
        }
        return "Failed to update password";
    }

    // delete the User
    async deleteUser(userId) {
        console.log("ID:", userId);
        let message = "";
        // this will only update the deleted_at
        const deleteUser = users.findOne({where: {user_id: userId}}).then(function(user){
            user.destroy();
        });
        if (deleteUser){
            return "Successfully deleted the user";
        }
        return "Failed to delete the user";
    }
}

module.exports = UserAPI;