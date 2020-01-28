const envConf = require('./conf/env-conf')
const expressConf = require('./conf/express-conf')

const bootReport = () => {
    console.log('\nAll set!\n')
    console.log(`Server is now listening on http://localhost:${process.env.SUGARGLIDER_API_PORT}\n`)
    process.env.NODE_ENV === 'dev' && console.log(`GraphiQL is on an availabe at http://localhost:${process.env.SUGARGLIDER_API_PORT}/graphql\n`)

}

const main = () => {
    envConf()
    .then(expressConf)
    .then(bootReport)
    .catch(error=> {
        console.log(`Server initialization failed: ${error}`)
        process.exit(1)
    })
}

main()