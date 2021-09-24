import { gql } from 'apollo-server-express';

const noteTypes = gql`
    type Note{
        note_id: Int!
        content: String!
        deleted_at: Date
        updated_at: Date!
        created_at: Date!
        status: String!
    }

    type NoteList{
        note_id: Int!
        content: String!
    }

    type NoteAuth{
        token: String!
    }

    extend type Query{

    }

    extend type Mutation{
        viewNotes(user: String!):NoteList
        addNotes(content: String!):NoteAuth
        updateNotes(note_id: Int!, content: String!): NoteAuth
        deleteNotes(note_id: Int!):NoteAuth
    }
`