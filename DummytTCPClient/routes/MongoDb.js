/**
 * Created by Ashutosh on 6/24/2016.
 */
var MongoClient = require('mongodb');
var db;
var connected=false;
exports.connection = function(url, callback){
    MongoClient.connect(url, function(err, _db){
        if (err) { throw new Error('Could not connect: '+err); }
        else{
            db = _db;
            connected=true;
            console.log( db +" is connected?");
            callback(null,db);}
    });
};

exports.collection = function(name){
    if (!connected) {
        throw new Error('Must connect to Mongo before calling "collection"');
    }
    return db.collection(name);

};