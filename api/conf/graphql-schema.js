const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql')
const axios = require('axios')

const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    fields: {
        name: {
            type: GraphQLString
        }
    }
})

const PetType = new GraphQLObjectType({
    name: 'Pet',
    fields: {
        uuid: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        // owners: {
        //     type: GraphQLList(OwnerType)
        // }
    }
})

const PetResolver = (source, args, context, info) => {
    const {NEO4J_HOST, NEO4J_HTTP_API_PORT, NEO4J_DB_NAME} = process.env
    const url = `http://${NEO4J_HOST}:${NEO4J_HTTP_API_PORT}/db/${NEO4J_DB_NAME}/transaction/commit`
    const data = {
        statements: [
            {
                statement: `MATCH (p:PET ${args && JSON.stringify(args).replace(/"(.+)":/gi, '$1:')}) RETURN p`,
                parameters: {}
            }
        ]
    }
    debugger
    return axios.post(url, data)
    .then(response => {
        let resolved = []
        if (response.data.results) {
            resolved = response.data.results[0].data.map(result => {
                return {
                    ...result.row[0],
                }
            })
        }
        debugger
        return resolved
    })
}

const AllPetResolver = () => {
    return [{name: 'Pet-1'}, {name: 'Pet-2'}]
}

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            AllPet: {
                type: GraphQLList(PetType),
                resolve: AllPetResolver,
            },
            Pet: {
                type: GraphQLList(PetType),
                args: {
                    name: {
                        type: GraphQLString,
                    }
                },
                resolve: PetResolver,
            },
        }
    })
})