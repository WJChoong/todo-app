// const express = require('express');
// const { ApolloServer, gql } = require('apollo-server-express');
// const { graphqlHTTP } = require('express-graphql');
// const { buildSchema } = require('graphql');

// const app = express();
// const PORT = 3000;

// const typeDefs = gql`
//     type Users{
//         id: ID!
//         email: String!
//         updated_at: String!
//         created_at: String!
//         status: String!
//     }

//     type UserNotes{
//         user_id: ID!
//         note_id: ID!
//     }

//     type Notes{
//         id: ID!
//         content: String!
//         deleted_at: String
//         updated_at: String!
//         created_at: String!
//         status: String!
//     }

//     type Query{
//         user: Users
//         usernote: UserNotes
//         note: Notes
//     } 


// `;

// const resolvers = {
//     Query: {
//         user: () => ({
//             user_id: 1,
//             email: "super@gmail.com",
//             updated_at: "10-12-2021",
//             created_at: "10-12-2021",
//             status: "E",
//         }),
//         usernote: () => ({
//             user_id: 1,
//             note_id: 1,
//         }),
//         note: () => ({
//             note_id: 1,
//             content: "Physic Exercise",
//             deleted_at: "",
//             updated_at: "10-12-2021",
//             created_at: "10-12-2021",
//             status: "E",
//         })

//     }
// };

// const server = new ApolloServer({
//     typeDefs,
//     resolvers
// });

// async function startApolloServer() {
//     await server.start();

//     // Mount Apollo middleware here.
//     server.applyMiddleware({ app, path: '/apolloServer' });
//     await new Promise(resolve => app.listen({ port: PORT }, resolve));
//     console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
//     return { server, app };
// }

// startApolloServer();

const app = require("./app");
const PORT = process.env.PORT || 3000;
require('dotenv').config(); // import the env file

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
