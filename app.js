const express = require("express");
const { ApolloServer} = require('apollo-server-express');
const db = require("./models");
const {typeDefs, resolvers} = require('./graphql');
const NotesAPI = require('./datasources/notes');
const UserAPI = require('./datasources/user');

const port = 5000;
const app = express();
app.use(express.json());

db.sequelize.sync()
    .then(() => {
        app.listen(port);
    })
    .catch(e => console.log(e));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        notesAPI: new NotesAPI(),
        userAPI: new UserAPI()
    }),
});

async function startApolloServer() {
    await server.start();
    const PORT = 4000;
    // Mount Apollo middleware here.
    server.applyMiddleware({ app, path: '/apolloServer' });
    await new Promise(resolve => app.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    return { server, app };
}
startApolloServer();

module.exports = app;
