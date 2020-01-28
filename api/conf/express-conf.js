const express = require('express')
const helmet = require('helmet')
const { getGraphqlEndpoint } = require('./graphql-conf')

module.exports = () => {
    return new Promise((resolve, reject) => {
        console.log('Configuring ExpressJS...')
        const sucessHandler = () => {
            console.log('done!')
            return resolve(true)
        }

        try {
            const app = express()
            
            app.use(helmet())
            app.use('/graphql', getGraphqlEndpoint())

            app.listen(process.env.SUGARGLIDER_API_PORT)
            .on('listening', sucessHandler)
            .on('error', reject)
        }
        catch(error) {
            return reject(error)
        }
    })
}
