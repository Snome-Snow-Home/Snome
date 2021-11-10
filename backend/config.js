require('dotenv').config()


/* COMMON CONFIGURATION */
module.exports = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}

/* DEVELOPMENT CONFIGURATION */
if (process.env.NODE_ENV == "dev") {
    module.exports = {

    }
}

/* CI CONFIGURATION */
if (process.env.NODE_ENV == "ci") {
    module.exports = {
        
    }
}

/* PRODUCTION CONFIGURATION */
if (process.env.NODE_ENV == "prod") {
    module.exports = {
        server: {
            
        }
    }
}

    