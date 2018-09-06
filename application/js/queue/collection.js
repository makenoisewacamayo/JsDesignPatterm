/*jshint esnext: true */
define([
    'track/controller',
    'utils/iterator_mixin',
    'utils/util'
], function(TrackController, IteratorMixin, Util) {
    function TracksIterator() {
        this.init();
    }

    Util.mixFromTo(IteratorMixin, TracksIterator.prototype);

    TracksIterator.prototype.loadFrom = function(url, callback) {
        var that = this;

        var promise = new Promise(function (resolve, reject) {
            var client = new XMLHttpRequest();
            client.open("GET", url);
            client.send();
            client.onload = function() {
                if (this.status == 200) {
                    var objectsArray = JSON.parse(this.response);
                    addObjectAsModels(objectsArray, that);
                    resolve(JSON.parse(this.response));
                } else {
                    reject(this.statusText);
                }
            };
            client.onerror = function() {
                reject(this.statusText);
            };
        });

       return promise;

    };

    function addObjectAsModels(objectsArray, parent) {
      var trackController, childTrack;
      for (var i = 0; i < objectsArray.length; i++) {
        if (objectsArray[i].tracks) {
          childTrack = objectsArray[i].tracks;
          delete objectsArray[i].tracks;
        } else {
          childTrack = [];
        }

        trackController = new TrackController(objectsArray[i].type || 'tracks', objectsArray[i]);
        parent.addChild(trackController);
        addObjectAsModels(childTrack, trackController);
      }
    }

    var tracksCollection = new TracksIterator();

    return function() {
        return tracksCollection;
    };
});
