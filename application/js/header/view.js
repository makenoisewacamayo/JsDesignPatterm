define(['utils/dom', 'utils/pubsub'], function(D$, PubSub) {
   var headerStateElement = document.getElementById('header-state');
   var headerStateTextElement = document.getElementById('header-state-text');
   var headerStateIconElement = document.getElementById('header-state-icon');

   PubSub.on('player:play', function (track) {
     D$.display(headerStateElement);
     D$.text(headerStateTextElement, track.title);
     D$.removeClass(headerStateIconElement, 'glyphicon-pause');
     D$.addClass(headerStateIconElement, 'glyphicon-play');
   });

   PubSub.on('player:pause', function (track) {
     D$.removeClass(headerStateIconElement, 'glyphicon-play');
     D$.addClass(headerStateIconElement, 'glyphicon-pause');
   });

});
