const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const expressGraphql = require('express-graphql')

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world'
                }
            }
        }
    })
})

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
