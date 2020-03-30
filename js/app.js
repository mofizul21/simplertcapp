// replace these values with those generated in your TokBox Account
var apiKey = "46625392";
var sessionId =
  "1_MX40NjYyNTM5Mn5-MTU4NTU0ODAyMTc0MH55VWZEZmdOTmdRRlBHVXJuaVMyZ2ZsMER-fg";
var token =
  "T1==cGFydG5lcl9pZD00NjYyNTM5MiZzaWc9MWUyOGVlNDU0YWI4N2MzOGU1ODU2MWRkZDFhMzBlNjhiZDNmYzg5ZDpzZXNzaW9uX2lkPTFfTVg0ME5qWXlOVE01TW41LU1UVTROVFUwT0RBeU1UYzBNSDU1VldaRVptZE9UbWRSUmxCSFZYSnVhVk15WjJac01FUi1mZyZjcmVhdGVfdGltZT0xNTg1NTQ4MDU1Jm5vbmNlPTAuMjM1MDIyNjcxMTc2OTMzNDMmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU4ODE0MDA1NiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

// (optional) add server code here
initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on("streamCreated", function(event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%"
      },
      handleError
    );
  });

  // Create a publisher
  var publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%"
    },
    handleError
  );

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
