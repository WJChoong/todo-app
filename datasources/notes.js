const { DataSource } = require('apollo-datasource');
const user_notes = require('../models/user_notes');
const notes = require('../models/note');
const db = require('../config/config');
const note = require('../models/note');
const Sequelize =  require("sequelize");
const config = require('../config/config');
// const isEmail = require('isemail');

class NotesAPI extends DataSource {
    constructor() {
        super();
        const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
            dialect: 'mysql',
            host: config.db.host,
        });
        this.database = sequelize
    }

    initialize(config) {
        this.context = config.context;
    }

    notesReducer(notes) {
        return {
            note_id: notes.note_id || 0,
            content: notes.content,
            deleted_at: notes.deleted_at,
            updated_at: notes.updated_at,
            status: notes.status,
            created_at: note.created_at,
        };
    }

    async getAllNotes() {
        const response = await this.get(notes);
        return Array.isArray(response)
            ? response.map(note => this.notesReducer(note))
            : [];
    }
    
    // async getAllNotes(){
    //     const response = await db.user_notes.findAll();
    //     return this.notesReducer(response[0]);
    // }

    async getNotesById({ userId }) {
        const response = await this.get('user_notes', { userId });
        return this.notesReducer(response[0]);
    }
}

module.exports = NotesAPI;

// const { GraphQLList } = require("graphql");
// const db = require('../models');
// const { user_notes } =require('../models/user_notes');

// module.exports = getAllUsersNotes = {
//     resolve: () => {
//         return user_notes.findAll();
//     }
// }