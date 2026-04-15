export default {

    port: process.env.PORT || 3000,

    cors: {
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