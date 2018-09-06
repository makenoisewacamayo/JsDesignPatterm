define([
	'track/model_track',
	'track/model_single',
	'track/model_album'
	], function(TrackModel, SingleModel, AlbumModel) {
		return function(type, data) {
			var Model;
			switch (type) {
				case 'album':
					Model = AlbumModel;
					break;
				case 'single':
					Model = SingleModel;
					break;
				case 'track':
				default: 
					Model = TrackModel;
					break;
			}
			return Object.create(Model).init(data);

		}

	});