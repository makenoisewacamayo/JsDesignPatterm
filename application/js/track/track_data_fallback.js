define([], function() {

    function getFallBackdata(track) {
        var promise = new Promise(function(resolve, reject) {
           var trackYear = track.originalYear || "No year";
           trackYear = track.albumYear || trackYear;
           trackYear = track.year || trackYear;

           resolve({
             originalYear: trackYear,
             cover: "images/cover-fallback.jpg"
           });

        });
        return promise;
    }

    return {
        get: getFallBackdata
    };

});
