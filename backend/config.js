require('dotenv').config()

/* COMMON CONFIGURATION */
common = {
    server: {
        host: 'localhost',
        port: 3000,
    },

    s3: {
        region: process.env.REGION,
        bucketName: process.env.AWS_BUCKET_NAME,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
}

/* DEVELOPMENT CONFIGURATION */
development = {
    db: {
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: 'postgres'
    }

}

/* TEST CONFIGURATION */
// note: jest sets NODE_ENV to 'test'
test = {
    db: {
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: 'postgres'
    }

}

/* PRODUCTION CONFIGURATION */
production = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }

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
