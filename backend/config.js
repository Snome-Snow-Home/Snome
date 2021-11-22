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
    },
    aws: {
        region: process.env.REGION,
        bucketName: process.env.AWS_BUCKET_NAME,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
}

/* DEVELOPMENT CONFIGURATION */
development = {
    
}

/* TEST CONFIGURATION */
// note: jest sets NODE_ENV to 'test'
test = {

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


if (process.env.NODE_ENV == "test") {
    module.exports = {
        ...common,
        ...test
    }
}


if (process.env.NODE_ENV == "prod") {
    module.exports = {
        ...common,
        ...production
    }
}

  