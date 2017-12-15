var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3000/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  db.createCollection("books", function(err, res) {
    if (err) throw err;

    var myobj = { title: "Ready Player One", author: "Ernest Cline", publisher: "Random House", rating: "0" }
    var myobj2 = { title: "Treasure Island", author: "Robert Louis Stevenson", publisher: "Cassell and Company", rating: "0" }
    var myobj3 = { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", publisher: "Bloomsbury Publishing", rating: "0" }
    var myobj4 = { title: "Charlie and the Chocolate Factory", author: "Roald Dahl", publisher: "Alfred A. Knopf, Inc.", rating: "0" }
    var myobj5 = { title: "The Hobbit", author: "J. R. R. Tolkien", publisher: "George Allen & Unwin", rating: "0" }

    db.collection("books").insertOne(myobj, function(err, res) {
    	if (err) throw err;
    	console.log("ReadyPlayerOne inserted");
  	});

  	db.collection("books").insertOne(myobj2, function(err, res) {
    	if (err) throw err;
    	console.log("TreasurePlanet inserted");
  	});

  	db.collection("books").insertOne(myobj3, function(err, res) {
    	if (err) throw err;
    	console.log("HarryPotter inserted");
  	});

  	db.collection("books").insertOne(myobj4, function(err, res) {
    	if (err) throw err;
    	console.log("Charlie inserted");
  	});

  	db.collection("books").insertOne(myobj5, function(err, res) {
    	if (err) throw err;
    	console.log("Hobbit inserted");
  	});

  	db.close();
  });

  db.createCollection("users", function(err, res) {
    if (err) throw err;

        var myobj6 = { username: "Tsumino", datejoin: "10/10/2017", shelves: "1", booksowned: "5" }
	    var myobj7 = { username: "Afterglow", datejoin: "21/3/2017", shelves: "2", booksowned: "12" }
	    var myobj8 = { username: "Courier96", datejoin: "11/6/2016", shelves: "3", booksowned: "20" }
	    var myobj9 = { username: "xOver", datejoin: "1/1/2017", shelves: "1", booksowned: "2" }
	    var myobj10 = { username: "ParkTheMan", datejoin: "8/7/2017", shelves: "2", booksowned: "10" }

	    db.collection("users").insertOne(myobj6, function(err, res) {
	    	if (err) throw err;
	    	console.log("Tsumino inserted");
	  	});

	  	db.collection("users").insertOne(myobj7, function(err, res) {
	    	if (err) throw err;
	    	console.log("Afterglow inserted");
	  	});

	  	db.collection("users").insertOne(myobj8, function(err, res) {
	    	if (err) throw err;
	    	console.log("Courier inserted");
	  	});

	  	db.collection("users").insertOne(myobj9, function(err, res) {
	    	if (err) throw err;
	    	console.log("xOver inserted");
	  	});

	  	db.collection("users").insertOne(myobj10, function(err, res) {
	    	if (err) throw err;
	    	console.log("Park inserted");
	  	});

    db.close();
  });

});