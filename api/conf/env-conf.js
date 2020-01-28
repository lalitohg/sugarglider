module.exports = () => {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === "dev") {
            console.log("Loading development environment...")
            const defaultEnvVars = require('./default-env-vars')
            Object.assign(process.env, defaultEnvVars)
            const result = require('dotenv').config({path: `${process.env.PWD}/conf/.env`})
            if (!result.error) {
                Object.assign(process.env, result.parsed)
            }
            console.log("done!")
            return resolve(true)
        }
        return resolve(true)
    })
}
