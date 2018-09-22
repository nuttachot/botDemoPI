'use strict';

var admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');
process.env.DEBUG = 'actions-on-google';

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

var serviceAccount = require("./botdbkey.json");
 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://botdb-b2b78.firebaseio.com/'
});

var db = admin.database();
var ref = db.ref("/");


function test() {
	/*
  	//SELECT * profile WHERE id = U6733b19e487ac9a823d742eafdf3a365
	var itemRef = ref.child("profile");
	itemRef.child("Ud3375351be60efc187b3f137a32b66aa").on("value", function(snapshot) {
	  let id= snapshot.val();
	  console.log(id);
    });
  
    //SELECT * FROM profile WHERE name = "อาจารย์พู่";
    var itemRef = ref.child("profile");
    itemRef.orderByChild("name").equalTo("อาจารย์พู่").on("value", function(snapshot) {
  	  let profile = snapshot.val();
  	  console.log(profile);
  	  //console.log(event['-LMwnQSUOXiKj1WYQp8z'].type);
        //snapshot.forEach(function(data) {
        //    console.log(event[data.key].type);
        //});
    });
	
	//SELECT * FROM profile LIMIT 10
    var itemRef = ref.child("profile");
    itemRef.orderByKey().limitToFirst(10).on("value", function(snapshot) {
  	  let profile = snapshot.val();
  	  console.log(profile);
  	 
    });
	*/
	//SELECT * FROM profile WHERE type = "admin" && profileCreatedTime = "9/19/2018, 3:09:48 PM";
	

  
    /*
    var itemRef = ref.child("test");
    var newItemRef = itemRef.push();
    newItemRef.set({
      "User ID": '1234',
      "Message": 'Hello Firebase Database',
      "Message Created Time": new Date().toString()
    });
 
    var itemId = newItemRef.key;
    console.log("A new item with ID " + itemId + " is created."); 
	/*
  
    
}

server.post('/',function (request,response) {
  const agent = new WebhookClient({ request, response });
  
  function add(agent) {
    const number = agent.parameters.number;
    const number1 = agent.parameters.number1;
	
    const sum = number + number1;
    agent.add('ผลบวกคือ '+ sum);
	//const userId = request.body.originalDetectIntentRequest.payload.data.source.userId;
  }
  
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
  
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  function testDB(agent) {
	  test();
      agent.add(`testDB!`);
  }
  
  let intentMap = new Map();
  
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('addNumbers', add);
  intentMap.set('testDB', testDB);
  
  agent.handleRequest(intentMap);
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});
