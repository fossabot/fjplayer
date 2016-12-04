/**
 * @module Constants
 */
export const FJCONFIG_LOOP = 'FJLoop';
export const FJCONFIG_START_PLAYING = 'FJStartplaying';
export const FJCONFIG_ENABLE_BACK_LINK = 'FJEnableFullScreenBackLink';
export const FJCONFIG_APP_ID = 'FJAppId';
export const FJCONFIG_STARTING_MODE = 'FJStartingMode';
export const FJCONFIG_CLASS = 'FJClass';
export const FJCONFIG_TYPE = 'FJType';
export const FJCONFIG_TITLE = 'FJTitle';
export const FJCONFIG_SRC = 'FJSrc';
export const FJCONFIG_POSTER = 'FJPoster';
export const FJCONFIG_ADS_LINK_URL = 'FJAdsLinkUrl';
export const FJCONFIG_ADS_ESCAPE_AT = 'FJAdsEscapeAt';
export const FJCONFIG_THUMBS = 'FJThumbs';
export const FJCONFIG_SUBTITLES = 'FJSubtitles';
export const FJCONFIG_OVERLAYS = 'FJOverlays';
export const FJCONFIG_DRM = 'FJDrm';
export const FJCONFIG_SUB_LABEL = 'FJSubLabel';
export const FJCONFIG_SUB_SRC = 'FJSubSrc';
export const FJCONFIG_SUB_LANG = 'FJSubLang';
export const FJCONFIG_OVER_DATA = 'FJOverData';
export const FJCONFIG_OVER_URL = 'FJOverUrl';
export const FJCONFIG_OVER_DURATION = 'FJOverDuration';
export const FJCONFIG_OVER_SHOW_AT = 'FJOverShowAt';
export const FJCONFIG_DRM_SCHEME = 'FJDrmScheme';
export const FJCONFIG_DRM_LICENSE_SERVER = 'FJLicenceServer';
export const FJCONFIG_DRM_HEADER_LICENSE_REQUEST = 'FJHeadersOnLicenseRequest';
export const FJCONFIG_DRM_HEADER_SEGMENTS_REQUEST = 'FJHeadersOnSegmentsRequest';

export const FJCONFIG_TRUE = 'true';
export const FJCONFIG_FALSE = 'false';
export const FJCONFIG_BOOLEAN = { FJCONFIG_TRUE, FJCONFIG_FALSE };

export const FJCONFIG_CLASS_ADS = 'ads';
export const FJCONFIG_CLASS_VOD = 'vod';
export const FJCONFIG_CLASS_LIVE = 'live';
export const FJCONFIG_CLASSES = [FJCONFIG_CLASS_ADS, FJCONFIG_CLASS_LIVE, FJCONFIG_CLASS_VOD];

export const FJCONFIG_TYPE_MP4 = 'video/mp4';
export const FJCONFIG_TYPE_DASH = 'dash';
export const FJCONFIG_TYPES = [FJCONFIG_TYPE_MP4, FJCONFIG_TYPE_DASH];

export const FJCONFIG_DRM_SCHEME_FORJA = 'forja';
export const FJCONFIG_DRM_SCHEME_CLEARKEY = 'clearKey';
export const FJCONFIG_DRM_SCHEME_WIDEVINE = 'widevine';
export const FJCONFIG_DRM_SCHEME_PLAYREADY = 'playReady';
export const FJCONFIG_DRM_SCHEMES = [
    FJCONFIG_DRM_SCHEME_FORJA,
    FJCONFIG_DRM_SCHEME_CLEARKEY,
    FJCONFIG_DRM_SCHEME_WIDEVINE,
    FJCONFIG_DRM_SCHEME_PLAYREADY
];

export const FJPLAYER_HTML_INNER = '	<video width="320" height="240" controls> </video>';