//process.env.MONGO_DB = 'mongodb://mongo:27017/restaurant'
process.env.MONGO_DB = 'mongodb://localhost:27017/restaurant'

process.env.PORT = process.env.PORT || 3000

// ## TOKEN ##
process.env.EXP_TOKEN = 60 * 60 * 24 * 30;
process.env.SEED = process.env.SEED || 'secret-dev';

// ## GOOGLE ##
process.env.CLIENT_ID = "1003292142133-fn7pg33of8sqlvf8je0msa1esdgl3mpr.apps.googleusercontent.com";