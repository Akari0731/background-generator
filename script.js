var rgba = document.querySelector(".rgba");
var hex = document.querySelector(".hex");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var opacity = document.getElementById("range");

//change background color
function setGradient() {
	var range = opacity.value / 100;
	var color1Code = "rgba(" + hex2rgb(color1.value) + ", " + range + ")";
	var color2Code = "rgba(" + hex2rgb(color2.value) + ", " + range + ")";
	body.style.background = 
	"linear-gradient(to right, "
	+ color1Code
	+ ", "
	+ color2Code
	+ ")";

	//for mobile
	color1.style.background = color1Code;
	color2.style.background = color2Code;

	rgba.textContent = "RGBA :" + body.style.background + ";";

	hex.textContent = 
	"HEX : linear-gradient(to right, "
	+ color1.value
	+ convertOpacity(range)
	+ ", "
	+ color2.value
	+ convertOpacity(range)
	+ ");";
}

//rgb to hex(6digit)
function rgb2hex(red, green, blue) {
	var rgb = blue | (green << 8) | (red << 16);
	return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

//hex(6digit) to rgb
function hex2rgb(hexcode) {
	var hex = hexcode.slice(0,7);
	// long version
	r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
	if (r) {
		return r.slice(1,4).map(function(x) { return parseInt(x, 16); });
	}
	// short version
	r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
	if (r) {
		return r.slice(1,4).map(function(x) { return 0x11 * parseInt(x, 16); });
	}
	return null;
}

//convert transparent number from hex(8digit) to rgba 
function convertOpacity(rgbaPercent) {
	var convertTable = opacityConvertTable();
	var percent = Math.round(rgbaPercent * 100);
	var hexpercent = convertTable[percent];
	return hexpercent;
}

//get rgba transparent number 
function opacityConvertTable() {
	var rgbaTable = {};
	for (var i = 1; i >= 0; i -= 0.01) {
		i = Math.round(i * 100) / 100;
		var hex = (Math.round(i * 255) + 0x10000).toString(16).substr(-2).toUpperCase();
		var perc = Math.round(i * 100);
		rgbaTable[perc] = hex;
	}
	return rgbaTable;
}

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
opacity.addEventListener("input", setGradient);
