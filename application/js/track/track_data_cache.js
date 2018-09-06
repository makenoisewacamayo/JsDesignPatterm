define(["utils/util"], function(Util) {
    var tracksCacheUnique = {};
    var tracksCacheCommon = [];

    function getCachedTrackdata(track) {
        var promise = new Promise(function(resolve, reject) {
            if (tracksCacheUnique.hasOwnProperty(track.id)) {
                var fullTrackData = Util.clone(tracksCacheUnique[track.id]);
                Util.mixFromTo(fullTrackData._common, fullTrackData);
                delete fullTrackData._common;
                resolve(fullTrackData);
            } else {
                reject("No cache for given track");
            }
        });
        return promise;
    }


   function getCommonDataObject(data) {
     for (var i =0; i < tracksCacheCommon.length; i++) {
       if (Util.equal(tracksCacheCommon[i],data)) {
         return tracksCacheCommon[i];
       }
     }
     tracksCacheCommon.push(data);
     return tracksCacheCommon[tracksCacheCommon.length - 1];
   }

   function getCommonAndUniqueParts(trackData) {
     var data = Util.clone(trackData);
     var commonData = {
       originalYear: data.originalYear,
       cover: data.cover
     };
     delete data.originalYear;
     delete data.cover;

     return [commonData, data];
   }

    function addTrackToCache(id, trackData) {
        var dataParts = getCommonAndUniqueParts(trackData);
        var uniqueData = dataParts[1];
        uniqueData._common = getCommonDataObject(dataParts[0]);

        tracksCacheUnique[id] = uniqueData;
    }

    return {
        get: getCachedTrackdata,
        set: addTrackToCache
    };

});
