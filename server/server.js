var express = require('express');
var app = express();
var tracksCollection = require('./tracks/collection');


app.use(express.static('application'));

app.get('/tracks', function(req, res){
  res.json(tracksCollection.getTracksTree());
});

app.get("/track/:trackId", function (req, res) {
  var trackData = tracksCollection.getTrackById(req.params.trackId);
  // console.log(req.params.trackId);
  // console.log(trackData);
  if (trackData != null && req.params.trackId != 3) {
    res.json(trackData);
  } else {
    res.status(404).send("No track with such ID found");
  }
});

app.listen(3002);
