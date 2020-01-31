const schema = require('./graphql-schema')
const expressGraphql = require('express-graphql')

const getGraphqlEndpoint = (schemaOverride) => {
    return expressGraphql({
        schema: schemaOverride || schema,
        graphiql: process.env.NODE_ENV === 'dev'
    })
}

module.exports = {
    schema,
    getGraphqlEndpoint
}
