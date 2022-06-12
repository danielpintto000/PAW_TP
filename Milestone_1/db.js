//Import necessário
var mongoose = require("mongoose");

//mongoose.Promise = global.Promise;

//const connection = mongoose.createConnection("mongodb://localhost/PAW");

//Mongo Atlas
mongoose.connect('mongodb+srv://user2:Zf4s0HegmBA6vOP8@paw.wj9qx.mongodb.net/PAW?retryWrites=true&w=majority',
    {useNewUrlParser: true} )

//Localmente
//mongoose.connect('mongodb://localhost/PAW').then(() => console.log ('connection succeful')).catch((err) => 
    //console.error(err));

//module.exports = connection;