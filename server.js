var express = require('express'),
    bodyParser = require('body-parser'),
    timeout = require('connect-timeout'),
    neo4j = require('neo4j'),
    // neoDb = new neo4j.GraphDatabase('http://localhost:7474'),
    mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/second');
var db = mongoose.connection;

var userSchema = mongoose.Schema({
    _id: Number,
    name: String 
});

var artistSchema = mongoose.Schema({
    _id: Number,
    name: String,
    url: String,
    picture_url: String,
    listeners: Number
});

var User = mongoose.model('User', userSchema);
var Artist = mongoose.model('Artist', artistSchema);

app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(timeout(1000000));

var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});

db.once('open', function callback () {

  app.post('/search', function(req, res){
      // Do a text search on artist using the query param
      Artist.find({ $text: { $search: req.body.query } }, function(err, data) {
          res.json(JSON.stringify(data));
          res.end();
      });
  });
  app.post('/listen', function(req, res){

    // Neo4j is still inserting data
    //
    // var query = [
    //   'MATCH (user:User), (artist:Artist)',
    //   'WHERE ID(user) = {userId} AND ID(artist) = {artistId}',
    //   'CREATE UNIQUE (user)-[r:PLAYS]-(artist)',
    //   'SET r.count = coalesce(r.count?, 0) + 1',
    //   'RETRUN r',
    // ].join('\n')

    // var params = {
    //     userId: req.body.user_id,
    //     artistId: req.body.artist_id,
    // };

    // neoDb.query(query, params, function (err, results) {

    //   // If the neo query was successful
    //   if (!err) {
    //     if (results[0].count == 1) {
    //       // This is the first time this user has listened, increment listeners on artist
    //       Artist.update({_id: artist_id}, 
    //         { $inc: { listeners: 1 } }
    //       );
    //     } 
    //     res.json(JSON.stringify([{success: true}]));
    //     res.end();
    //   }
    // });
      // Stub to test until Neo4j set up
      res.json(JSON.stringify([{success: true}]));
      res.end();
  });
  app.post('/recommend', function(req, res){
    
    // Neo4j is still inserting data
    //
    // // Three arrays for each of our recommendations
    // var recommendSets = [[],[],[]],
    // // The count and number of neo async request to wait for before running our mongo query
    // countNeoAsync = 0,
    // totalNeoAsync = 3,
    // // The count and numbero of mongo requests before responding to the request
    // countMongoAsync = 0,
    // totalMongoAsync = 3;


    // // Find all artists listened by a user’s friends but not the user
    // // order them by the sum of listening count, recommend the top 5
    // var query = [
    //   'MATCH (user)-[:FRIENDS_WITH]-(friend)-[p:PLAYS]-(artist)',
    //   'WHERE NOT (user)-[:PLAYS]->(artist) AND ID(user) = {userId}',
    //   'RETURN artist, sum(p.count) AS count',
    //   'ORDER BY count DESC',
    //   'LIMIT 5',
    // ].join('\n')

    // var params = {
    //   userId: req.body.user_id
    // };

    // neoDb.query(query, params, function (err, results) {
    //   // If the neo query was successful
    //   if (!err) {
    //     for (var i = 0; i < results.length; i++) {
    //       recommendSets[0].push(results[i]['artist']['id']);
    //     }
    //     checkNeoAsync();
    //   }
    // });



    // // Find all artists listened by a user’s friend but not the user
    // // order them by the number of friends listening to them, recommend the top 5
    // var query = [
    //   'MATCH (user)-[:FRIENDS_WITH]-(friend)-[p:PLAYS]-(artist)',
    //   'WHERE NOT (user)-[:PLAYS]->(artist) AND ID(user) = {userId}',
    //   'RETURN artist, count(DISTINCT artist.id) AS count',
    //   'ORDER BY count DESC',
    //   'LIMIT 5',
    // ].join('\n')

    // var params = {
    //   userId: req.body.user_id
    // };

    // neoDb.query(query, params, function (err, results) {
    //   // If the neo query was successful
    //   if (!err) {
    //     for (var i = 0; i < results.length; i++) {
    //       recommendSets[1].push(results[i]['artist']['id']);
    //     }
    //     checkNeoAsync();
    //   }
    // });

    // // Find all artists listened by a user’s friends but not the user
    // // order them by the sum of listening count, recommend the top 5
    // var query = [
    //   'MATCH (user:User)-[tags:TAGS]-()',
    //   'WHERE ID(user) = {userId}',
    //   'WITH tags.value AS tag, RAND() as num',
    //   'ORDER BY num',
    //   'LIMIT 1',
    //   'MATCH ()-[:TAGS {value: tag}]-(artist)',
    //   'WHERE NOT (user)-[:PLAYS]->(artist)',
    //   'RETURN artist',
    //   'ORDER BY artist.listeners DESC',
    //   'LIMIT 5',
    // ].join('\n')

    // var params = {
    //   userId: req.body.user_id
    // };

    // neoDb.query(query, params, function (err, results) {
    //   // If the neo query was successful
    //   if (!err) {
    //     for (var i = 0; i < results.length; i++) {
    //       recommendSets[2].push(results[i]['artist']['id']);
    //     }
    //     checkNeoAsync();
    //   }
    // });

    // // Our output object containing the three sets
    // var output = {
    //   friends_most_listens: [],
    //   friends_most_listeners: [],
    //   tags: []
    // };

    // function checkNeoAsync() {
    //   countNeoAsync += 1;
    //   if (countNeoAsync == toalNeoAsync) {

    //     // Use our set of IDs to get data from Mongo
    //     Artist.find({_id: { $in: recommendSets[0] }}, function(err, data) {        
    //         for (var i = 0; i < data.length; i++) {
    //           output.friends_most_listens.push(data[i]); 
    //         }
    //         checkMongoAsync();
    //     });
    //     // Use our set of IDs to get data from Mongo
    //     Artist.find({_id: { $in: recommendSets[1] }}, function(err, data) {        
    //         for (var i = 0; i < data.length; i++) {
    //           output.friends_most_listeners.push(data[i]); 
    //         }
    //         checkMongoAsync();
    //     });
    //     // Use our set of IDs to get data from Mongo
    //     Artist.find({_id: { $in: recommendSets[2] }}, function(err, data) {        
    //         for (var i = 0; i < data.length; i++) {
    //           output.tags.push(data[i]); 
    //         }
    //         checkMongoAsync();
    //     });


    //   }
    // }

    // function checkMongoAsync() {
    //   countMongoAsync += 1;
    //   if (countMongoAsync == totalMongoAsync) {

    //     // All three mongo requests are done, send the data back
    //     res.json(JSON.stringify(output));
    //     res.end();
    //   }

    // }
      var output = {
        friends_most_listens: [],
        friends_most_listeners: [],
        tags: []
      };
      // Stub to test until Neo4j set up
      Artist.find({}).limit(15)
      .exec(function(err,data) {
        for (var i = 0; i < 15; i++) {
          if (i % 3 == 0) {
            output.friends_most_listens.push(data[i]);
          } else if (i % 3 == 1) {

            output.friends_most_listeners.push(data[i]);
          } else {

            output.tags.push(data[i]);
          }
        }
        res.json(JSON.stringify(output));
        res.end();
      });

  });
});