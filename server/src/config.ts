export default {

    port: process.env.PORT || 3000,

    cors: process.env.NODE_ENV === 'production' ? {
        origin: 'https://your-production-domain.com', // CHANGE HERE
        optionsSuccessStatus: 200,
    } : {
        origin: '*',
    },

    session: {
        secret: process.env.SESSION_SECRET || 'default_secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    },
    
};