require('dotenv').config()

/* COMMON CONFIGURATION */
common = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'postgres',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres'
    },
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,
    }
}

/* DEVELOPMENT CONFIGURATION */
development = {
    
}

/* CI CONFIGURATION */
ci = {

}

/* PRODUCTION CONFIGURATION */
production = {

}

if (process.env.NODE_ENV == "dev") {
    module.exports = {
        ...common,
        ...development
    };
}


if (process.env.NODE_ENV == "ci") {
    module.exports = {
        ...common,
        ...ci
    }
}


if (process.env.NODE_ENV == "prod") {
    module.exports = {
        ...common,
        ...production
    }
}

  