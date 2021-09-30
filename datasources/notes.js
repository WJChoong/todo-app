const { DataSource } = require('apollo-datasource');
const { UserInputError } = require('apollo-server-errors');
const {notes, user_notes, users, sequelize} = require('../models');
const user = require('../models/user');

class NotesAPI extends DataSource {
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

    async getAllNotes(userId) {
        console.log(userId)
        
        const userDetails = await users.findOne({
            include: [
                {
                    model: user_notes,
                },
                {
                    model: notes,
                    // as: "note_id"
                }
            ],
            where: {
                "user_id": userId
            },
        });
        const returnUserDetails = {
            user: {
                user_id: userDetails.dataValues.user_id,
                name: userDetails.dataValues.name,
                email: userDetails.dataValues.email,
                password: userDetails.dataValues.password,
                status: userDetails.dataValues.status,
            },
            notes: userDetails.notes
        }
        console.log(returnUserDetails);

        return returnUserDetails;
    }

    // get all notes of a user
    async getAllNotesById(userId) {
        console.log(userId)
        const { rows } = await user_notes.findAndCountAll({
            where: {
              "user_user_id": userId
            },
          });
        return rows;
    }

    // Get specific notes 
    async getNoteById(note_id) {
        console.log("2");
        const { rows } = await notes.findAndCountAll({
            where: {
              "note_id": note_id
            },
        });
        console.log(rows);
        return rows;
    }

    async addNewNote(userId, content) {

        try{

            // const t = await sequelize.transaction();

            await sequelize.transaction(async (t) => {
                const note = await notes.create({ 
                    content: content,
                    status: "A"
                }, {transaction: t});
                console.log("Note ID is:", note.note_id);
                console.log("UserID:", userId);
                const user_note = await user_notes.create({ 
                    noteNoteId: note.note_id,
                    userUserId: userId,
                }, {transaction: t});
                console.log(user_note);  
            }); //check
            return "Notes is saved";

        }catch(error){

            console.log("Error: ", error);
            return "Failed to save notes";

        }        
    }

    // update notes
    async updateNoteContent(noteId, content) {
        const updates = notes.update(
            { content: content },
            { where: {note_id: noteId} }
        )
        if (updates){
            return "Successfully updated";

        };
        return "Failed to update";
    }

    // delete the Note
    async deleteNote(noteId) {
        console.log("ID:", noteId);
        // this will only update the deleted_at
        const deleteNotes = notes.findOne({where: {note_id: noteId}}).then(function(note){
            note.destroy();
        });
        if (deleteNotes){
            return "Successfully deleted the note";
        }
        return "Failed to delete the notes";
    }
}

module.exports = NotesAPI;