function TrackCollection() {
    this.inlineTracks = {};
    this.nestedTracks = [];
    this.maxTrackId = 0;
}

TrackCollection.prototype.add = function(track) {
    if (track.parenId != null && this.inlineTracks[track.parentId] != null) {
        // check if parent has tracks field
        if (this.inlineTracks[tracks.parenId].tracks == null) {
            this.inlineTracks[tracks.parenId].tracks = [];
        }

        this.inlineTracks[tracks.parenId].tracks.push(track);
    } else {
        this.nestedTracks.push(track);
    }
    this.inlineTracks[track.id] = track;
};

TrackCollection.prototype.getTracksTree = function() {
    return this.nestedTracks;
};

TrackCollection.prototype.getTrackById = function(id) {
    var trackData = this.inlineTracks[id];
    if (trackData != null ) {
      trackData.originalYear = 2000 + (trackData.id % 2);

      if (trackData.id % 4 !== 0) {
        trackData.cover = "images/cover" + (trackData.id % 4) + ".jpg";
      }

      return trackData;
    } else {
      return null;
    }
};

module.exports = TrackCollection;
