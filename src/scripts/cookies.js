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
function getScreenWidth() {
  return screen.width;
}
function getScreenHeight() {
  return screen.height;
}

function getCookie(cookie) {
	let cookies = document.cookie.split(";");
	for (let i=0;i<cookies.length;++i) {
		if (cookies[i].split("=")[0].trim()===cookie) {
			return decodeURIComponent(cookies[i].split("=")[1]);
		} 
	}
	return "";
}

function setCookie(cookie, value, maxAge = 15) {
	document.cookie = `${cookie}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite="Lax";`;
}

function pageLoaded() {
	cookieText();
	let cookie = getCookie("cookies-enabled");
	if (cookie==="y") {
		loadCookies();
		return
	}
	promptCookies();
}

function cookieText() {
	let string = "";
	for (let i=0;i<999;++i) {
		string+=randomText();
		string+=" ";
	}
	string+=randomText();
	document.querySelector(".cookie").innerHTML = string;
}

function randomText() {
	let r = Math.floor(Math.random()*4);
	switch(r) {
		case 0:
			return `<span style='font-size: ${Math.floor(Math.random()*24)+8}px'>Cookies!</span>`;
		case 1:
			return `<span style='font-size: ${Math.floor(Math.random()*24)+8}px' class='orange'>Cookies!</span>`;
		case 2:
			return `<span style='font-size: ${Math.floor(Math.random()*24)+8}px' class='green'>Cookies!</span>`;
		case 3:
			return `<span style='font-size: ${Math.floor(Math.random()*24)+8}px' class='purple'>Cookies!</span>`;
	}
}

function promptCookies() {
	[...document.querySelectorAll(".cookie-settings input[type='checkbox']")].forEach(e=>{
		e.checked = true;
	})

	document.querySelector(".cookie-prompt").classList.add("active");
	document.querySelector(".cookie-prompt .cookie-accept").addEventListener("click", acceptCookies);
	document.querySelector(".cookie-prompt .cookie-deny").addEventListener("click", cookieSettings);
}

function acceptCookies(e) {
	if (document.querySelector(".browser-toggle").checked) {
		setCookie("browser", getBrowser());
	}
	if (document.querySelector(".os-toggle").checked) {
		setCookie("os", getOS());
	}
	if (document.querySelector(".sw-toggle").checked) {
		setCookie("swidth", getScreenWidth());
	}
	if (document.querySelector(".sh-toggle").checked) {
		setCookie("sheight", getScreenHeight());
	}
	document.querySelector(".cookie-prompt").classList.remove("active");
	document.querySelector(".cookie-settings").classList.remove("active");

	setCookie("cookies-enabled", "y");
	console.log(document.cookie);
}

function cookieSettings(e) { //settings menu
	document.querySelector(".cookie-prompt").classList.remove("active");
	document.querySelector(".cookie-settings").classList.add("active");
	//setCookie("cookies-enabled", "n");
	document.querySelector(".cookie-settings .cookie-save").addEventListener("click", acceptCookies);
}

function loadCookies() {
	if (getCookie("browser")) {
		console.log(`Browser: ${getCookie("browser")}`);
	}
	if (getCookie("os")) {
	console.log(`Operating System: ${getCookie("os")}`);
	}
	if (getCookie("swidth")) {
	console.log(`Screen Width: ${getCookie("swidth")}`);
	}
	if (getCookie("sheight")) {
	console.log(`Screen Height: ${getCookie("sheight")}`);
	}
}

pageLoaded(); //since we are using defer