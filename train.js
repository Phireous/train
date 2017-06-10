// boilerplate
// add firebase config
// connect to firebase
// get a refernce to the database via firebase

$('#SOME_BUTTON_GOES_HERE').on('click', function() {
  // collect the data from the html form, create variables to hold the data
  // train name, .... etc
  var trainName = $("#train-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var firstTrain = $("#firsttrain-input").val().trim();
  
  // when retrieving the "first train" data, make sure to parse it into a Unix timestamp
  var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  var firstTrainUnix = moment(firstTrainConverted).format("X");
  // `push` that data into firebase (assume that the `child_added` listener updates HTML)
  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    firstTrain: firstTrainUnix
  });
  // alert that train was added
  alert("Train has been added.");
  // clear out our HTML form for the next input
  $("#train-input").html("");
  $("#destination-input").html("");
  $("#frequency-input").html("");
  $("#firsttrain-input").html("");
});


something.on('child_added', function(childSnapshot) {
  console.log('the childSnapshot data', childSnapshot.val());

  // create local variables to store the data from firebase
  var name = childSnapshot.val().trainName;
  var location = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var first = childSnapshot.val().firstTrain;
  var timeInMinutes = "";
  var tArrival = "";
  // FIRST MAKE THE table row show up with empty strings for `timeInMinutes` / `tArrival `
  $("#train-info").prepend("<tr>" + "<td> " + name +
    " </td><td> " + location + 
    " </td><td> " + frequency + 
    " </td><td> " + tArrival +
    " </td><td> " + timeInMinutes + " </td></tr> "
  );

  // THEN DO THIS MATH
        // compute the difference in time from 'now' and the first train, store in var
        // get the remainder of time after using `mod` with the frequency, store in var
        // subtract the remainder from the frequency, store in var `timeInMinutes`
        // format `timeInMinutes` ()"make pretty") and store in var `tArrival`

// ITS OKAY TO JUST SHOW EMPTY STRINGS for `timeInMinutes` / `tArrival`
  // append to our table of trains, inside the `tbody`, with a new row of the train data

});
