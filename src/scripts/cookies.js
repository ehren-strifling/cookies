"use strict";

function getOS() {
  if (navigator.userAgentData) { //experimental feature, not on all browsers
    return navigator.userAgentData.platform;
  }
  //desperate
  let str = navigator.userAgent;
  for (let i=0;i<str.length;++i) {
    if (str.charAt(i)==="(") {
      str = str.substring(i+1, str.length);
      let j=str.indexOf(" ");
      return str.substring(0,j);
    }
  }
  // if (navigator.platform) { //extremely desprit
  //   return navigator.platform;
  // }
  
}

function getBrowser() {
  //navigator.userAgentData.brands; //I don't think this works well
  let str = navigator.userAgent;
 
  
  if (str.indexOf("Edg") > 0) {return "Microsoft Edge";}
  if (str.indexOf("Firefox") > 0) {return "Mozilla FireFox";}
  //I don't have the rest of these so I don't know if they work. They will avoid false positives though
  if (str.indexOf("OPR") > 0) {return "Opera";} 
  if (str.indexOf("SamsungBrowser") > 0) {return "Samsung Internet";}
  //Unfortunately, not all browsers are this easy, Google chrome in particular is a pain
  //We're just going to say chrome here because a lot of browsers will have a false positive
  if (str.indexOf("Chrome") > 0 && str.indexOf("Safari") > 0) {
    if (navigator.vendor==="Google Inc.") { // I really don't know how else to try detecting google specifically.
      return "Google Chrome";
    }
    return "Chrome"; //some Chrome based browser, not sure what
  }
  //Safari without chrome is hopefully just safari
  //if (str.indexOf("Safari") > 0) {return str}
  //actually, we're better off using our backup strategy to detect safari
  
  //At this point we have no clue what browser they have so we're just going to return the last browser listed.
  let a = str.lastIndexOf(" ")+1;
  let b = str.lastIndexOf("/");
  if (b<0) {b = str.length;}
  return str.substring(a,b);
}
function getWindowWidth() {
  return window.innerWidth;
}
function getWindowHeight() {
  return window.innerHeight;
}
