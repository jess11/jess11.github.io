MusicPlayer = function(track) {
  var files = [];
  for (var i = 0; i < arguments.length; i++) {
    files.push(arguments[i]);
  }
  this.track = new buzz.sound(files);
  this.track.loop();
  this.firstTime = true;
}

MusicPlayer.prototype = {

  click: function() {
    var me = document.createEvent('MouseEvents');
    me.initMouseEvent('mouseup', true, true, window, 9001, -1, -1, -1, -1,
      false, false, false, false, 0, null);
    var d = $(this.container)[0].children[0];
    d.dispatchEvent(me);
  },

  play: function() {
    if (this.firstTime) {
      this.firstTime = false;
      window.setTimeout((function() {
        this.track.play();
        this.click();
        this.playing = true;
      }).bind(this), 333);
    }
    else {
      this.track.play();
      this.click();
      this.playing = true;
    }
  },

  pause: function() {
    this.track.pause();
    this.click();
    this.playing = false;
  },

  appendTo: function(element) {
    if (element.length) {
      element = element[0];
    }

    this.container = element;
    var stage = new swiffy.Stage(element, window._playerSwiffyObject);
    stage.start();

    this.container.addEventListener('mouseup', (function(e) {
      if (e.detail != 9001) {
        e.stopImmediatePropagation();
        if (this.playing) {
          this.pause();
        }
        else {
          this.play();
        }
      }
    }).bind(this), true);

    $('head').append('<style>._mpcursor{cursor:pointer!important}</style>');
    $(this.container.children[0]).addClass('_mpcursor');

    return this;
  }

}