import Logger from './Logger';
require('./player.css');
import * as Const from './constants';
/**
 * @module AdsManager
 * @description The AdsManager is the class whinch will manage Ads
 *  on a video.
 *  Ads will be played on a another video html overlaying current video
 */
function AdsManager(video, AdsContainerdiv) {
    this.logger = new Logger(this);
    this.video = video;
    this.midAds = [];
    this.postAds = [];
    this.preAds = [];
    this.ads = null;
    this.settled = false;
    this.AdsContainerdiv = AdsContainerdiv;
};

/**
 * Function to be called from event 'timeupdate' from video
 * called to check if overlays has to Start
 */
AdsManager.prototype.CheckMidAds = function(self, secondes) {
    var i = 0;
    var item = null;
    var show = 0;
    if (self.settled !== true) {
        return;
    }
    for (i = 0; i < self.midAds.length; i++) {
        item = self.midAds[i];
        show = parseInt(item[Const.FJCONFIG_SHOW_AT], 10);
        if (secondes === show) {
            self.logger.info(i, ' starting Ads Now .. ');
            if (self.midAds[i].started === false) {
                self.logger.info(i, ' starting a new  Mid Ads .. ');
                self.midAds[i].started = true;
                self.StartMidAds(self, i);
            } else {
                self.logger.info(i, ' already started ', item[Const.FJCONFIG_URL],
                    ' @@ ', item[Const.FJCONFIG_SHOW_AT]);
            }
        }
    }
};

AdsManager.prototype.Setup = function(ads) {
    var i = 0;
    var sz;
    var item;
    var clas;
    this.ads = ads;
    for (i = 0; i < this.ads.length; i++) {
        item = ads[i];
        clas = item[Const.FJCONFIG_CLASS];
        if (clas === Const.FJCONFIG_ADS_CLASS_PRE_ROLL) {
            sz = this.preAds.push(item);
            this.preAds[sz - 1].started = false;
        } else if (clas === Const.FJCONFIG_ADS_CLASS_POST_ROLL) {
            sz = this.postAds.push(item);
            this.postAds[sz - 1].started = false;
        } else {
            sz = this.midAds.push(item);
            this.midAds[sz - 1].started = false;
        }
    }
    this.settled = true;
    this.logger.info('Ads Setup is settled ', this.settled);
    this.logger.warn('Cheking PRE ROLL Ads .. ', this.preAds.length);
    this.logger.warn('Cheking MID ROLL Ads .. ', this.midAds.length);
    this.logger.warn('Cheking POST ROLL Ads .. ', this.postAds.length);
};

AdsManager.prototype.clicked = function(self, index) {
    var item = self.overlays[index];
    window.open(item[Const.FJCONFIG_URL], '_blank');
};

AdsManager.prototype.StopPreAds = function(self, index) {
    // todo
};

AdsManager.prototype.StartPreAds = function(self, index) {
    // todo
};

AdsManager.prototype.StopMidAds = function(self, index) {
    var el = self.AdsContainerdiv;
    var elClone = null;
    var item = self.midAds[index];
    self.logger.info(index, 'stopping MId Ads ', item[Const.FJCONFIG_URL],
        ' @@ ', item[Const.FJCONFIG_SHOW_AT]);
    // remove the click event
    el = self.AdsContainerdiv;
    elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
    self.AdsContainerdiv = elClone;
    // hide the overlay , empty the div
    while (self.AdsContainerdiv.hasChildNodes()) {
        self.AdsContainerdiv.removeChild(self.AdsContainerdiv.firstChild);
    }
    self.AdsContainerdiv.innerHTML = '';
    self.AdsContainerdiv.style.display = 'none';
    // resume current video
    self.video.style.display = 'block';
    self.video.play();

};

AdsManager.prototype.StartMidAds = function(self, index) {
    var item = self.midAds[index];
    var adsvideo = document.createElement('video');
    var source = document.createElement('source');
    self.logger.info(index, 'starting MId Ads ', item[Const.FJCONFIG_URL],
        ' @@ ', item[Const.FJCONFIG_SHOW_AT]);
    self.midAds[index].started = true;
    // hide all div ads content
    self.AdsContainerdiv.style.display = 'none';
    // fill ads container
    adsvideo.preload = true;
    adsvideo.controls = false;
    adsvideo.autoplay = false;
    source.src = item[Const.FJCONFIG_SRC];
    source.type = item[Const.FJCONFIG_TYPE];
    adsvideo.appendChild(source);
    self.AdsContainerdiv.appendChild(adsvideo);
    // pause current video and play ads
    self.video.pause();
    self.AdsContainerdiv.style.display = 'block';
    self.video.style.display = 'none';
    adsvideo.play();
    // event to catch ended playing on video
    adsvideo.addEventListener('ended', function(e) {
        self.StopMidAds(self, index);
    });
};

AdsManager.prototype.StopPostAds = function(self, index) {
    // todo
};

AdsManager.prototype.StartPostAds = function(self, index) {
    // todo
};
export default AdsManager;