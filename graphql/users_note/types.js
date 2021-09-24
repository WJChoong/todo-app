import { gql } from 'apollo-server-express';

const noteTypes = gql`
    type UsersNotes{
        user_id: Int!
        notes_id: Int!
    }

    type NoteList{
        note_id: Int!
    }

    extend type Query{

    }

    extend type Mutation{
        getAllNotes(user_id: Int!):NoteList
    }
`