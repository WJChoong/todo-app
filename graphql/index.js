const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Note{
        note_id: Int!
        content: String!
        status: String!
    }
    
    type Notes{
        notes: [Note]
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
        user_id: Int!
        notes_id: Int!
    }

    type Query{
        checkNotes: Note
        listNotes(userId: Int): [UsersNotes]
        viewNotes(noteId: Int): [Note]

        getDetails(userId: Int!): [User]
    }

    type Mutation {        
        addNotes(userId: Int!, content: String!): String
        editNotes(noteId: Int!, content: String!): String
        deleteNotes(noteId: Int!): String  # parameters must be the same as below one

        register(userName: String!, userEmail: String!, userPassword: String!): String
        login(userEmail: String!, userPassword: String!): String
        editUser(userEmail: String!, userNewPassword: String!): String
        deleteUser(userId: Int!):String
    }
`;

// schema response is an object

// schema, resolvers parameter always the same

const resolvers = {
    Query:{
        // Note API
        listNotes: async (_, { userId }, { dataSources }) => {
            const returnData = await dataSources.notesAPI.getAllNotesById(userId);
            return returnData;
        },

        viewNotes: async (_, { noteId }, { dataSources }) =>{  
            const returnData = await dataSources.notesAPI.getNoteById(noteId)
            return returnData;
        },

        // User API
        getDetails: async (_, { userId }, { dataSources }) =>{  
            const returnData = await dataSources.userAPI.getNoteById(userId)
            return returnData;
        },
    },
    Mutation:{
        // Note API
        addNotes:(_, { userId, content }, { dataSources }) =>{
            const returnData =  dataSources.notesAPI.addNewNote(userId, content);
            return returnData;
        },

        editNotes:(_, { noteId, content }, { dataSources }) =>{
            const returnData = dataSources.notesAPI.updateNoteContent(noteId, content);
            return returnData;
        },

        deleteNotes:(_, { noteId }, { dataSources }) =>{
            const returnData = dataSources.notesAPI.deleteNote(noteId)
            return returnData;
        },

        // User API
        register:(_, { userName, userEmail, userPassword }, { dataSources }) =>{
            const returnData =  dataSources.userAPI.addNewUser(userName, userEmail, userPassword);
            return returnData;
        },

        login:(_, { userEmail, userPassword }, { dataSources }) =>{
            const returnData =  dataSources.userAPI.loginUser(userEmail, userPassword);
            return returnData;
        },

        editUser:(_, { userEmail, userNewPassword }, { dataSources }) =>{
            const returnData =  dataSources.userAPI.editUser(userEmail, userNewPassword);
            return returnData;
        },

        deleteUser:(_, { userId }, { dataSources }) =>{
            const returnData = dataSources.userAPI.deleteUser(userId)
            return returnData;
        },
    }        
}

module.exports = {typeDefs, resolvers};