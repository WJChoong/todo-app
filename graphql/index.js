const {gql} = require('apollo-server-express');
const db = require('../models');
// const getAllUsersNotes = require('../datasources/notes');

const typeDefs = gql`
    type Note{
        note_id: Int!
        content: String!
        status: String!
    }

    type User{
        user_id: Int!
        name: String!
        email: String!
        password: String!
        status: String!
    }

    type UsersNotes{
        id: Int!
        user: User!
        notes_id: [Note]
    }

    type UserAuth {
        token: String
    }

    type UserActionResponse{
        success: Boolean  
        message: String   
    }

    type NoteUpdateResponse{
        success: Boolean  
        message: String   
        userNotes: [UsersNotes]  
    }

    type Query{
        hello: String
        listNotes(user_id: Int): UsersNotes
        viewNotes(note_id: Int): Note
    }

    type Mutation {
        register(name: String!, email: String!, passowrd: String!): UserAuth
        login(email: String!, password: String!): UserAuth
        
        addNotes(user_id: Int): NoteUpdateResponse
        editNotes(note_id: Int!, content: String!): NoteUpdateResponse
        deleteNotes(note_id: Int): NoteUpdateResponse
    }
`;

const resolvers = {
    Query:{
        hello: () => "Hello",
        listNotes: async (user_id) => {
            return await dataSources.NotesAPI.getAllNotes();
        },
        // listNotes: async (user_id) => {
        //     return (listNotes = await db.user_notes.findAll());
        // },
        // listNotes: async (root, { id }, { models: { user_notes } }) => user_notes.findAll(),
        // listNotes: (_, { id }, { dataSources }) =>
        //     dataSources.notesAPI.getNotesById({ user_id: id }),
    }        
}

module.exports = {typeDefs, resolvers};