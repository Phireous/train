// boilerplate
// add firebase config
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDV7h28ZqCTVDM4-hZmHpMy6FrKW_L7nAk",
  authDomain: "train-72c24.firebaseapp.com",
  databaseURL: "https://train-72c24.firebaseio.com",
  projectId: "train-72c24",
  storageBucket: "train-72c24.appspot.com",
  messagingSenderId: "887442278568"
};
firebase.initializeApp(config);

// connect to firebase
// get a refernce to the database via firebase

var database = firebase.database();

$('#add-train').on('click', function() {
  event.preventDefault();
  // collect the data from the html form, create variables to hold the data
  // train name, .... etc
  var trainName = $("#train-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var firstTrain = $("#firsttrain-input").val().trim();
  
  // when retrieving the "first train" data, make sure to parse it into a Unix timestamp
  
  var firstTrainUnix = moment(firstTrain, "hh:mm").format("X");
  // `push` that data into firebase (assume that the `child_added` listener updates HTML)
  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    firstTrain: firstTrainUnix
  });
  // alert that train was added
  
  // clear out our HTML form for the next input
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#firsttrain-input").val("");

  alert("Train has been added.");
});


database.ref().on('child_added', function(childSnapshot) {
  console.log('the childSnapshot data', childSnapshot.val());

  // create local variables to store the data from firebase
  var name = childSnapshot.val().trainName;
  var location = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var firstTime = childSnapshot.val().firstTrain;
  var timeInMinutes;
  var tArrival;
  // FIRST MAKE THE table row show up with empty strings for `timeInMinutes` / `tArrival `
  
  
  // THEN DO THIS MATH
  var firstTrainConverted = moment(firstTime, "X").subtract(1, "years");
  console.log(firstTrainConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  console.log("first train time: " + moment(firstTrainConverted, "X").format("hh:mm"));
        // compute the difference in time from 'now' and the first train, store in var

  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
        // get the remainder of time after using `mod` with the frequency, store in var
  var tRemainder = diffTime % frequency;
  console.log("remainder: " + tRemainder);
        // subtract the remainder from the frequency, store in var `timeInMinutes`
  timeInMinutes = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + timeInMinutes);
        // format `timeInMinutes` ()"make pretty") and store in var `tArrival`
  var nextTrain = moment().add(timeInMinutes, "minutes");
  tArrival = moment(nextTrain).format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// ITS OKAY TO JUST SHOW EMPTY STRINGS for `timeInMinutes` / `tArrival`
  // append to our table of trains, inside the `tbody`, with a new row of the train data
  $("#train-info").prepend("<tr>" + "<td> " + name +
    " </td><td> " + location + 
    " </td><td> " + frequency + 
    " </td><td> " + tArrival +
    " </td><td> " + timeInMinutes + " </td></tr> "
  );


});
