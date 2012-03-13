var DEBUG_MODE = true;

var FLOAT_ACCURACY = 4;
var FLOAT_ACCURACY_ACCURATE = 9;
var SEPARATOR = /\s|,/;

var DEFAULT_STYLE = {
  fill: {
    color: [0, 0, 0, 0],
    rule: "nonzero",
    none: true
  },
  stroke: {
    color: [0, 0, 0, 255],
    width: 1,
    none: false
  },
  visibility: true,
  cursor: "default"
};


var BROWSER = (function() {

  var nVer = window.navigator.appVersion;
  var nAgt = window.navigator.userAgent;
  var browserName  = window.navigator.appName;
  var fullVersion  = ''+parseFloat(window.navigator.appVersion);
  var majorVersion = parseInt(window.navigator.appVersion,10);
  var nameOffset,verOffset,ix;
  var identifier;

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
    browserName = "Opera";
    identifier = 'op';
    fullVersion = nAgt.substring(verOffset+6);
    if ((verOffset=nAgt.indexOf("Version"))!=-1)
      fullVersion = nAgt.substring(verOffset+8);
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
    browserName = "Microsoft Internet Explorer";
    identifier = 'ie';
    fullVersion = nAgt.substring(verOffset+5);
  }
  // In Chrome, the true version is after "Chrome"
  else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
    browserName = "Chrome";
    identifier = 'ch';
    fullVersion = nAgt.substring(verOffset+7);
  }
  // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
    browserName = "Safari";
    identifier = 'saf';
    fullVersion = nAgt.substring(verOffset+7);
    if ((verOffset=nAgt.indexOf("Version"))!=-1)
      fullVersion = nAgt.substring(verOffset+8);
  }
  // In Firefox, the true version is after "Firefox"
  else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
    browserName = "Firefox";
    identifier = 'fx';
    fullVersion = nAgt.substring(verOffset+8);
  }
  // In most other browsers, "name/version" is at the end of userAgent
  else if ((nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')))
  {
    identifier = 'other';
    browserName = nAgt.substring(nameOffset,verOffset);
    fullVersion = nAgt.substring(verOffset+1);
    if (browserName.toLowerCase()==browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix=fullVersion.indexOf(";"))!=-1)
    fullVersion=fullVersion.substring(0,ix);
  if ((ix=fullVersion.indexOf(" "))!=-1)
    fullVersion=fullVersion.substring(0,ix);

  majorVersion = parseInt(''+fullVersion,10);
  if (isNaN(majorVersion)) {
    fullVersion  = ''+parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion,10);
  }

  return {
    name:             browserName,
    identifier:       identifier,
    version:          majorVersion,
    precise_version:  fullVersion,
    application_name: navigator.appName,
    user_agent:       navigator.userAgent
  };

})();
