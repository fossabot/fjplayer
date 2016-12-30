(function() {
    'use strict';

    // global namespace
    var fjplayer = function(videoContainerId , usedSkin, fullScreenOnStart){
      var timestamp = new Date().getUTCMilliseconds();
      var id = new Date().valueOf()+'_'+ Math.random();
      // Check if the browser supports the Fullscreen API
      this.fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
      this.timeout = null;
      this.isHidden = false ;
      this.isStarted = false ;
      this.src = null ;
      this.poster = null ;
      this.title = null ;
      this.fullScreenOnStart = fullScreenOnStart ;
      this.supportsVideo = !!document.createElement('video').canPlayType;
      this.uidone = false ;
      this.videoContainerId = videoContainerId ;
      this.playerUsedSkin = usedSkin;
      this.videoInfoId  = 'vi'+id;
      this.videoFigureId  = 'vf'+id;
      this.videoId  = 'vo'+id;
      this.videoControlsId  = 'vc'+id ;
      this.playpauseBtnId = 'pp'+id;
      this.muteBtnId   = 'mb'+id;
      this.volumeBarId = 'vb'+id;
      this.volumeDivId = 'vd'+id ;
      this.progressDivId ='pd'+id;
      this.progressBarId  = 'pb'+id
      this.fullScreenBtnId = 'fs'+id ;
      this.expandBtnId = 'eb'+id ;
      this.subtitlesBtnId = 'sb'+id ;
      this.languagesBtnId = 'lb'+id ;
      this.thumbsDivId = 'td'+id ;
      this.thumbsImgId = 'ti'+id ;
    }
    fjplayer.prototype.setUi = function() {
        if(this.uidone)
          return ;
          //set Style to container
          this.videoContainer = document.getElementById(this.videoContainerId);
          this.videoContainer.className = ' fjPlayer '+this.playerUsedSkin ;
          this.videoContainer.innerHTML=
            '<figure id=\"'+this.videoFigureId+'\" data-fullscreen=\"false\">'+
            '<video id=\"'+this.videoId+'\" class=\"divofVideo\"    >' +
              '</video>'+
          '<div class=\"divInfo\" id=\"'+this.videoInfoId+'\">'+
              '<p class=\"divonecontrol divTspanitle divconeontrolLeft fa fa-arrow-left\"> </p>'+
              '<p class=\"divonecontrol divTspanitle divconeontrolLeft \"> </p>'+
              '<p class=\"divonecontrol divTspanitle divconeontrolLeft\">'+this.title+' </p>'+
              '<p class=\"divonecontrol divTspanitle divconeontrolRight fa fa-share-alt \"> </p>'+
              '<p class=\"divonecontrol divTspanitle divconeontrolRight \"> </p>'+
              '<p class=\"divonecontrol divTspanitle divconeontrolRight fa-download \"> </p>'+
          '</div>'+
/*
          '<div class=\"divBigPlayBtn\" id=\"'+this.videoInfoId+'\">'+
              '<p class=\"divonecontrol divTspanitle divconeontrolLeft fa fa-3x fa-play \"> </p>'+
          '</div>'+
*/
          '<div class=\"fjcontrols-panel\" id=\"'+this.videoControlsId+'\">'+
              '<div class=\"fjcontrols-panel-controls\">'+
                  '<div class=\"hprogressbar\" id=\"'+this.progressDivId +'\">'+
                      '<input class=\"clickable\" id=\"'+this.progressBarId +'\" type=\"range\"  />'+
                  '</div>'+
              '</div>'+
              '<div class=\"fjcontrols-control divconeontrolIcon divconeontrolLeft clickable \">'+
                  '<span id=\"'+this.playpauseBtnId+'\"  class=\"fa fa-play\" title=\"Play\" ></span>'+
              '</div>'+
              '<div  class=\"fjcontrols-control divconeontrolIcon divconeontrolLeft clickable\">'+
                  '<span id=\"'+  this.muteBtnId +'\" title=\"volume-full\" class=\"fa fa-volume-up\"></span>'+
              '</div>'+
              '<div class=\"fjcontrols-control\">'+
                  '<div class=\"volumebar\" id=\"'+this.volumeDivId +'\">'+
                      '<input  class=\"clickable\"  id=\"'+  this.volumeBarId +'\" type=\"range\" value=\"100\" min=\"0\" max=\"100\" step=\"1\" />'+
                  '</div>'+
              '</div>'+
              '<div class=\"fjcontrols-control\">'+
                  '<div id=\"'+this.timerId+'\" class=\"fjcontrols-control fjcontrols-control-text\">'+
                      '<span>0:00:00</span><span>/</span><span>0:00:00</span>'+
                  '</div>'+
              '</div>'+
              '<div class=\"fjcontrols-control divconeontrolIcon fjcontrols-control-right clickable\">'+
                  '<span  id=\"'+this.fullScreenBtnId+'\"  title=\"Fullscreen\" class=\"fa fa-arrows-alt\" ></span>'+
              '</div>'+
              '<div class=\"fjcontrols-control divconeontrolIcon fjcontrols-control-right clickable\">'+
                  '<span id=\"'+this.expandBtnId+'\"  class=\"fa fa-expand\" title=\"Double player size\" ></span>'+
              '</div>'+
              '<div class=\"fjcontrols-control divconeontrolIcon fjcontrols-control-right clickable\">'+
                  '<span id=\"'+this.subtitlesBtnId+'\"  class=\"fa fa-audio-description\" title=\"subtitles\" ></span>'+
              '</div>'+
              '<div class=\"fjcontrols-control divconeontrolIcon fjcontrols-control-right clickable\">'+
                  '<span id=\"'+this.languagesBtnId+'\"  class=\"fa fa-language\" title=\"Video quality\" ></span>'+
              '</div>'+
          '</div>'+
          '<div class=\"thumbsBlockDiv\" id=\"'+this.thumbsDivId+'\" >'+
              '<span class=\"thumbsBlock\" id=\"'+this.thumbsImgId+'\" ></span>'+
          '</div>'+
          '</figure>' ;
        console.log( ' UI is created !! ',this.videoContainer);
        this.uidone = false ;
    }
    //
    fjplayer.prototype.InitPlayer = function(self){
      self.progressBar.max = Math.round (self.video.duration);
      self.progressBar.min = 0;
      self.progressBar.step = 1;
      this.progressBar.value = 0 ;
      // init
      self.volumeBar.min = 0;
      self.volumeBar.step = 1;
      self.volumeBar.max = 100;
      self.volumeBar.value = 100 ;
      //
      self.timer.innerHTML = ' <span>' + self.duration(self.video.currentTime) + '</span><span>/</span><span>' + self.duration(self.video.duration) + '</span>';
      console.log(' Progress bar initilized !',self.video.duration ,self.progressBar.max);
    }
    // on volume bar click
    fjplayer.prototype.OnvbClick = function(e,self) {
      var pos = self.volumeBar.value / 100;
      console.log(" volume from ", self.video.volume, "to ", pos);
        if (pos > 0.6) {
            self.muteBtn.className = 'fa fa-volume-up';
        } else if (pos > 0) {
            self.muteBtn.className = 'fa fa-volume-down';
        } else {
            self.muteBtn.className = 'fa fa-volume-off';
        }
        self.video.volume = pos;
        console.log( ' new volume is ',pos);
    }
    // on click play pause btn
    fjplayer.prototype.onplaypauseClick =  function(self) {
        if(  !this.isStarted )
          this.isStarted = true ;
        if (self.video.paused || self.video.ended) {
            self.playpauseBtn.className = "fa fa-2x fa-pause";
            self.video.play();
        } else {
            self.playpauseBtn.className = "fa fa-2x fa-play";
            self.video.pause();
        }
        console.log("clicking pause/play !");
    }
    // handle
    fjplayer.prototype.handleFullscreen = function(self) {
        // If fullscreen mode is active...
        if (self.isFullScreen()) {
            // ...exit fullscreen mode
            // (Note: this can only be called on document)
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
            self.setFullscreenData(false);
            self.fullScreenBtn.className = "fa fa-2x fa-arrows-alt";
        } else {
            self.fullScreenBtn.className = "fa fa-2x fa-compress";
            // ...otherwise enter fullscreen mode
            // (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
            if (self.videoFigure.requestFullscreen) this.videoFigure.requestFullscreen();
            else if (self.videoFigure.mozRequestFullScreen) this.videoFigure.mozRequestFullScreen();
            else if (self.videoFigure.webkitRequestFullScreen) {
                // Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and
                // ensures that our custom controls are visible:
                // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
                // figure[data-fullscreen=true] .controls { z-index:2147483647; }
                self.video.webkitRequestFullScreen();
            } else if (self.videoFigure.msRequestFullscreen) self.videoFigure.msRequestFullscreen();
            self.setFullscreenData(true);

        }
    }

    // duration
    fjplayer.prototype.duration = function(secDuration) {
      var sec_num = parseInt(secDuration, 10); // don't forget the second param
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (minutes < 10) { minutes = "0" + minutes; }
      if (seconds < 10) { seconds = "0" + seconds; }

      if (hours == 0) {
          return (minutes + ':' + seconds);
      } else {
          if (hours < 10) { hours = "0" + hours; }
          return (hours + ':' + minutes + ':' + seconds);
      }
  }
    // Set the video container's fullscreen state
    fjplayer.prototype.setFullscreenData = function(state) {
        this.videoFigure.setAttribute('data-fullscreen', !!state);
    }

    // Checks if the documenplayercontainert is currently in fullscreen mode
    fjplayer.prototype.isFullScreen = function() {
        return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }

    // add event for mute
    fjplayer.prototype.onmuteClick = function(self) {
        self.video.muted = !self.video.muted;
        if (self.video.muted){
          self.muteBtn.className = 'fa fa-volume-off';
          self.volumeBar.value = 0;
        }
        else if (self.video.volume > 0.6) {
          self.volumeBar.value = self.video.volume * 100;
            self.muteBtn.className = 'fa fa-volume-up';
        } else {
          self.volumeBar.value = self.video.volume * 100;
            self.muteBtn.className = 'fa fa-volume-down';
          }
    }

    // As the video is playing, update the progress bar
    fjplayer.prototype.onvideoTimeupdate = function(self) {
        // For mobile browsers, ensure that the progress element's max attribute is set
        if ( self.progressBar.max != self.video.duration)
          self.progressBar.max = self.video.duration;
        self.progressBar.value = self.video.currentTime;
        self.timer.innerHTML = ' <span>' + self.duration(self.video.currentTime) + '</span><span>/</span><span>' + self.duration(self.video.duration) + '</span>';
    }

    // React to the user clicking within the progress bar
    fjplayer.prototype.onprogressClick =  function(e,self) {
      if ( self.progressBar.max != self.video.duration)
        self.progressBar.max = self.video.duration;
      var p = Math.round(self.progressBar.value);
      console.log(" Seeking from ", self.video.currentTime, ":: ",self.video.duration,"to ", p, " sec");
      if (self.video.seekable) {
          //pause
          if (!self.video.paused) {
              self.video.pause();
          }
          //change current time
          self.video.currentTime = p;
          //play
          self.video.play();
      } else {
          console.error("cannot seek to ", p, " sec ");
      }
      //
        //console.log(' seeking to ',pos,' all duration is ',self.video.duration);
        //self.video.currentTime = Math.round (pos * self.video.duration);
    }
    //hide or show panel controls
    fjplayer.prototype.HideControlsCursor = function (self, hideit) {
      if ( self.isStarted && hideit){
        self.videoControls.style.display = 'none';
        self.videoInfo.style.display = 'none';
        document.body.style.cursor  = 'none';
      }else{
        self.videoControls.style.display = 'block';
        self.videoInfo.style.display = 'block';
        document.body.style.cursor  = 'auto';
      }
    }
    fjplayer.prototype.magicMouse = function (self) {
      if (self.timeout) {
          clearTimeout(self.timeout);
      }
      self.timeout = setTimeout(function() {
          if (!self.isHidden) {
              self.HideControlsCursor(self,true);
              //document.querySelector("body").style.cursor = "none";
              //document.querySelector("#editor").style.background = "#fff";
              self.isHidden = true;
          }
      }, 3000);
      if (self.isHidden) {
          //document.querySelector("body").style.cursor = "auto";
          //document.querySelector("#editor").style.background = "#000";
          self.HideControlsCursor(self,false);
          self.isHidden = false;
      }
    }
    //set player
    fjplayer.prototype.Setup = function(file , title , poster ) {
      this.src = file ;
      var self = this ;
      this.title = title ;
        if (this.supportsVideo) {
          if (!this.uidone )
            this.setUi();
          // Obtain handles to main elements
          this.video = document.getElementById(this.videoId);
          this.videoFigure = document.getElementById(this.videoFigureId);
          if ( this.fullScreenOnStart === 'true')
            this.videoFigure.setAttribute('data-fullscreen', 'true');
          // Set Video
          if( (poster != undefined) && (poster != null) ){
            this.video.setAttribute('poster', poster);
            this.poster = poster ;
          }

          if(this.src != null || this.src != undefined){
            /* add thumbs */
            var source = document.createElement('source');
            this.video.setAttribute('src', this.src);
            this.video.setAttribute('type', 'video/mp4');
            this.video.appendChild(source);
          }

          this.videoControls = document.getElementById(this.videoControlsId);
          // Hide the default controls
          this.video.controls = false;

          // Display the user defined video controls
          this.videoControls.style.display = 'block';

          // Obtain handles to buttons and other elements
          this.playpauseBtn = document.getElementById(this.playpauseBtnId);
          this.muteBtn = document.getElementById(this.muteBtnId);
          this.volumeBar = document.getElementById(this.volumeBarId);
          this.progressDiv = document.getElementById(this.progressDivId);
          this.progressBar = document.getElementById(this.progressBarId);
          this.fullScreenBtn = document.getElementById(this.fullScreenBtnId);
          this.timer = document.getElementById(this.timerId);
          this.videoInfo = document.getElementById(this.videoInfoId);
          // If the browser doesn't support the Fulscreen API then hide the fullscreen button
          if (!this.fullScreenEnabled) {
              this.progressBar.style.display = 'none';
          }

          // React to the user clicking within the volume bar
          this.volumeBar.addEventListener('click', function(e) {
              self.OnvbClick(e,self);
          });
          // Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
          this.video.addEventListener('loadedmetadata',function(e) {
              self.InitPlayer(self)
          });
          // Add events for all buttons
          this.playpauseBtn.addEventListener('click', function(e) {
              self.onplaypauseClick(self)
          });
          // add event for mute
          this.muteBtn.addEventListener('click', function(e) {
              self.onmuteClick(self)
          });
          //add event for fullscreen
          this.fullScreenBtn.addEventListener('click',function(e) {
              self.handleFullscreen(self)
          });
          // As the video is playing, update the progress bar
          this.video.addEventListener('timeupdate', function(e) {
              self.onvideoTimeupdate(self)
          });
          // React to the user clicking within the progress bar
          this.progressBar.addEventListener('click', function(e) {
              self.onprogressClick(e,self);
          });
          // listen to mouse moving to hide or show panel
        this.video.addEventListener("mousemove",  function(e) {
            self.magicMouse(self);
        });


          // Only add the events if addEventListener is supported (IE8 and less don't support it, but that will use Flash anyway)
         if (document.addEventListener) {
              // Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself)
              document.addEventListener('fullscreenchange', function(e) {
                  this.setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
              });
              document.addEventListener('webkitfullscreenchange', function() {
                  this.setFullscreenData(!!document.webkitIsFullScreen);
              });
              document.addEventListener('mozfullscreenchange', function() {
                  this.setFullscreenData(!!document.mozFullScreen);
              });
              document.addEventListener('msfullscreenchange', function() {
                  this.setFullscreenData(!!document.msFullscreenElement);
              });
          }
      }
    }


    //Set current

    var player  = new fjplayer('playercontainer' , 'skin-default' ,false);
    player.Setup('https://content.jwplatform.com/videos/q1fx20VZ-kNspJqnJ.mp4' , ' title of movie' ,  null);

})();
