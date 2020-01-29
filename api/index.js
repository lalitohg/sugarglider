const envConf = require('./conf/env-conf')
const expressConf = require('./conf/express-conf')

const bootReport = () => {
    return new Promise((resolve, reject) => {
        console.log('\nAll set!\n')
        console.log(`Server is now listening on http://0.0.0.0:${process.env.SUGARGLIDER_API_PORT}\n`)
        process.env.NODE_ENV === 'dev' && console.log(`GraphiQL is on an availabe at http://0.0.0.0:${process.env.SUGARGLIDER_API_PORT}/graphql\n`)
        return resolve(true)
    })
    
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