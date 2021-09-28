const { DataSource } = require('apollo-datasource');
const {notes, user_notes, users} = require('../models');

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

    notesReducer(notes) {
        return {
            note_id: notes.note_id,
            content: notes.content,
            status: notes.status,
        };
    }

    async getAllNotes() {
        const response = await notes.findAll(); //[{}{}]
        return response;
    }

    // get all notes of a user
    async getAllNotesById(userId) {
        console.log(userId)
        const { rows } = await user_notes.findAndCountAll({
            where: {
              "user_id": userId
            },
          });
        return rows;
    }

    // Get specific notes 
    async getNoteById(note_id) {
        const { rows } = await notes.findAndCountAll({
            where: {
              "note_id": note_id
            },
          });
          console.log(rows);
        return rows;
    }

    async addNewNote(userId, content) {

        const note = await notes.create({ 
            content: content,
            status: "A"
         });
        console.log("Note ID is:", note.note_id);
        const user_note = await user_notes.create({ 
            user_id: userId,
            notes_id: note.note_id
        });
        console.log(user_note);
        if (user_note){
            return "Notes is saved";
        }
        return "Failed to save notes";
        
    }

    // update notes
    async updateNoteContent(noteId, content) {
        let message = "";
        console.log("Note ID: ", noteId);
        console.log("Content", content);
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
        let message = "";
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