import { gql } from 'apollo-server-express';

const userTypes = gql`
    type User{
        user_id: Int!
        name: String!
        email: String!
        password: String!
        deleted_at: Date!
        updated_at: Date!
        created_at: Date!
        status: String!
    }

    type UserAuth {
        token: String
    }

    extend type Query{
        user(id: ID!): User
        users: [User!]
    }

    extend type Mutation {
        register(name: String!, email: String!, passowrd: String!)): UserAuth
        login(email: String!, password: String!): UserAuth
    }
`