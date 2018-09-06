define([
    "queue/collection",
    "queue/collectionView",
    "utils/pubsub",
    "utils/util"
], function(TracksCollection, TrackView, PubSub, Util) {
    var defaultOptions = {
        autoplay: false,
        autorender: true,
        autoload: true
    };

    function QueueController(options) {
        options = options || {};
        for (var key in defaultOptions) {
            if (defaultOptions.hasOwnProperty(key) && !options.hasOwnProperty(key)) {
                options[key] = defaultOptions[key];
            }
        }

        this.initHooks();

        if (options.autoload) {
            this
                .loadData()
                .then(function(data) {
                    console.log("we have all the data", data);
                })
                .then(Util.proxy(function() {
                    if (options.autorender) {
                        this.render();
                    }
                    if (options.autoplay) {
                        PubSub.trigger('request:queue:next');
                    }
                }, this))
                .catch(function(err) {
                    console.log("we have an error", err);
                });

        }
    }



    QueueController.prototype.initHooks = function() {
        PubSub
            .on('request:queue:play', function(track) {
                this.collection.reset();
                while (this.collection.hasNext()) {
                    if (this.collection.next().value.model.get('id') == track.id) {
                        PubSub.trigger('request:player:play', this.collection.current().value.model.toJSON());
                        break;
                    }
                }
            }, this)
            .on('request:queue:next', function() {
                if (this.collection.hasNext()) {
                    PubSub.trigger('request:player:play', this.collection.next().value.model.toJSON());
                }
            }, this)
            .on('request:queue:remove', function(track) {
                // if it was active song then play next after it.
                if (this.collection.current().value && this.collection.current().value.model.get('id') == track.id) {
                    PubSub.trigger('request:queue:next');
                }
                // remove from the collection
                this.collection.removeById(track.id);
            }, this);
    };

    QueueController.prototype.loadData = function(callback) {
        this.collection = TracksCollection();
        return this.collection.loadFrom('/tracks');
    };

    QueueController.prototype.render = function() {
        if (!this.view) {
            this.view = new TrackView();
        }
        this.view.render(TracksCollection());
    };

    return QueueController;
});
