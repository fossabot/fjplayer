/**
 * The entry point for the library FJplayer.JS
 */
import Playlist from './js/player/playlist';
import Player from './js/player/player';
import Version from './Version';
import { PlayerEvents, AdsEvents, OverlayEvents } from './js/defs/constants';

// Shove both of these into the global scope
var context = (typeof window !== 'undefined' && window) || global;

var fjplayer = context.fjplayer;

if (!fjplayer) {
    fjplayer = context.fjplayer = {};
}

fjplayer.Playlist = Playlist;
fjplayer.Player = Player;
fjplayer.Version = Version;
fjplayer.PlayerEvents = PlayerEvents;
fjplayer.AdsEvents = AdsEvents;
fjplayer.OverlayEvents = OverlayEvents;


export default fjplayer;
export { Playlist };
export { Player };
export { Version };
export { PlayerEvents };
export { AdsEvents };
export { OverlayEvents };