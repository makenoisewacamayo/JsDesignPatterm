var CollectionClass = require('./collection_class');
var tracksCollection = new CollectionClass();

tracksCollection.add({
    id: 1,
    title: "First track",
    duration: 7
});

tracksCollection.add({
    id: 2,
    type: 'single',
    name: "Single track",
    duration: 14,
    year: 2010
});

tracksCollection.add({
    id: 3,
    title: "New track",
    duration: 23
});

 tracksCollection.add({
     id: 4,
     title: 'Best Track',
     duration: 4
 });

// tracksCollection.add({
//     id: 4,
//     type: 'single',
//     name: "Single track",
//     duration: 14,
//     year: 2010
// });

tracksCollection.add({
    id: 5,
    type: 'album',
    albumYear: 2010,
    albumTitle: 'Red fox'
});

tracksCollection.add({
    id: 6,
    parenId: 5,
    title: "Nested Track",
    duration: 23
});

tracksCollection.add({
    id: 7,
    type: 'album',
    albumYear: 2019,
    albumTitle: 'Under Red fox'
});

tracksCollection.add({
    id: 8,
    parenId: 7,
    title: "Double Nested Track",
    duration: 8
});

module.exports = tracksCollection;
