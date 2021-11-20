require('dotenv').config()

<<<<<<< HEAD
module.exports = {
    server: { host: "localhost", port: 3000 },
    db: { host: "snome.c9uk6piofxnr.us-east-2.rds.amazonaws.com",
    port: 5432,
    database: 'postgres',
    user: "Snome",
    password: "Snome_2021"
    }}

=======
>>>>>>> 134801034fd6a84cc840c5c487723f2753481ee0
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

<<<<<<< HEAD
=======
module.exports = {
    server: { host: "localhost", port: 3000 },
    db: { host: "snome.c9uk6piofxnr.us-east-2.rds.amazonaws.com",
    port: 5432,
    database: 'postgres',
    user: "Snome",
    password: "Snome_2021"
  }};  
>>>>>>> 134801034fd6a84cc840c5c487723f2753481ee0
