// Some useful variable contening the DOM element
var pic = document.getElementById('bgPic');
var frontRow = document.getElementById('frontRow');
var backRow = document.getElementById('backRow');
var parent = document.getElementById('interactiveMapContainer');

/**********************************************************************/

// Definition of the offsets of "Where is the first pin from the left/top corner (0,0 coordinate) of the picture"
// Copy/Paste adapt to add yours

var gpioOffset = {
	"xOffset" : 24, //for the x axis
	"yOffset" : 5, //for y axis
	"deltaX" : 6.1, //what is the derivation on the X axis between n and n-1 pin
	"deltaY" : 20.0, //what is the derivation on the Y axis between n and n-1 pin
	"direction" : "horizontal", //to know if the header is oriented horizontally or vertically
	"prefix" : "GPIO" //The name of this header (for the span IDs )
};

/**********************************************************************/

// startup function to populate the picture with span when the DOM is ready
(function(){
	pic.addEventListener('load', function() {
		addElements(GPIO);
		addCheckboxBehavior();
	});
})()

// This function add the checkbox behavior to slighty reveal the pins or not
function addCheckboxBehavior() {
	var el = document.getElementById('optionsReveal');
	var inputs = el.getElementsByTagName('input'); 
	for(var i=0; i<inputs.length; i++) {
		inputs[i].addEventListener('click', function() {
			var nom = this.id.substr(5);
			var elements = document.querySelectorAll('.' + nom);
			if(this.checked) {
				Array.prototype.forEach.call(elements, function(el, i) {
        			el.className += ' ' + 'opacity';
        		});
			} else {
  				Array.prototype.forEach.call(elements, function(el, i){
        			el.className = el.className.replace(new RegExp('(^|\\b)' + 'opacity'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        		});
			}
		});
	}
}

// This is the main function.
// It populate the DOM with plenty of empty span that you can hover
function addElements(liste) {
	var offset;

  	var picOffset = pic.getBoundingClientRect();

  	// choose the right offset definition depending on the header
  	switch(liste) {
  		case(GPIO) : offset = gpioOffset; break;
  		default : return; break;
  	}
  	offset.xOffset += picOffset.left; //add the horizontal picture offset
  	offset.yOffset += picOffset.top; //add the vertical picture offset

	// populate
	for(var x in liste) {
    	var newSpan = document.createElement('span');
    	var realX = parseInt(x)+1;
    	newSpan.setAttribute('id', offset.prefix + '_' + realX);
    	newSpan.classList.add("headerPin");
    	newSpan.classList.add("lightOpacity");
    	// class according to notes
		if(liste[x].Notes.substr(0,5) === "HDMI:") {
			newSpan.classList.add("hdmiPin");
		}  else if(liste[x].Notes.substr(0,6) === "Power:") {
			newSpan.classList.add("powerPin");
		}  else if(liste[x].Notes.substr(0,5) === "GPIO:") {
			newSpan.classList.add("gpioPin");
		}  else if(liste[x].Notes.substr(0,8) === "Warning:") {
			newSpan.classList.add("gpiowarningPin");
		}  else if(liste[x].Notes.substr(0,3) === "NC:") {
			newSpan.classList.add("notconnectedPin");
		}  else if(liste[x].Notes.substr(0,5) === "CAM0:") {
			newSpan.classList.add("cam0Pin");
		}  else if(liste[x].Notes.substr(0,5) === "CAM1:") {
			newSpan.classList.add("cam1Pin");
		}  else if(liste[x].Notes.substr(0,5) === "DSI0:") {
			newSpan.classList.add("dsi0Pin");
		}  else if(liste[x].Notes.substr(0,5) === "DSI1:") {
			newSpan.classList.add("dsi1Pin");
		}  else {
			newSpan.classList.add("otherPin");
		} 


		var sodimmHoleOffset = ((realX-1)/2 < 80) ? 0 : 36;
    	// position of the span element, mathematics here I come
		if(realX%2) {
			newSpan.style.left = (offset.xOffset + offset.deltaX*((realX-1)/2) + sodimmHoleOffset) + "px";
			newSpan.style.top = (offset.yOffset) + "px";
		} else {
			newSpan.style.left = (offset.xOffset + offset.deltaX*((realX-2)/2)  + sodimmHoleOffset) + "px";
			newSpan.style.top = (offset.yOffset + offset.deltaY) + "px";
		}

    	// add the eventListener
    	newSpan.addEventListener('mouseover', hovering);

    	// and finally add the span to the div
    	parent.appendChild(newSpan);
    }
}


// This is the function triggered everytime the mouse enter a span.
// It refresh the table row (take the datas from the big array below)
function hovering(evt) {
	var el = evt.target ? evt.target : evt.toElement; // IE/Mozilla/Chrome hack
	var id = el.getAttribute('id');
	var P = id.substr(0,id.indexOf("_"));
	var idx = parseInt(id.substr(id.indexOf("_")+1))-1;
	var liste = GPIO;

	var side = (idx%2) ? "Back" : "Front";
	var data = liste[idx];

	var content = "<th>" + side + "</th>";
	content += '<td>' + ((data['Number'] != "") ? data['Number'] : ' - ') + '</td>';
	content += '<td>' + ((data['Name'] != "") ? data['Name'] : ' - ') + '</td>';
	content += '<td>' + ((data['Notes'] != "") ? data['Notes'] : ' - ') + '</td>';
	frontRow.innerHTML = content; //update the row
	

}

/**********************************************************************/

// LONNNGGGGG definition of all the Pins...
var GPIO = [
{"Number":1,"Name":"gnd","Notes":"Power: Ground"},
{"Number":2,"Name":"EMMC_DISABLE_N","Notes":"Output"},
{"Number":3,"Name":"GPIO0","Notes":"GPIO:"},
{"Number":4,"Name":"x","Notes":"NC: Not Connected"},
{"Number":5,"Name":"GPIO1","Notes":"GPIO:"},
{"Number":6,"Name":"x","Notes":"NC: Not Connected"},
{"Number":7,"Name":"gnd","Notes":"Power: Ground"},
{"Number":8,"Name":"x","Notes":"NC: Not Connected"},
{"Number":9,"Name":"GPIO2","Notes":"GPIO:"},
{"Number":10,"Name":"x","Notes":"NC: Not Connected"},
{"Number":11,"Name":"GPIO3","Notes":"GPIO:"},
{"Number":12,"Name":"x","Notes":"NC: Not Connected"},
{"Number":13,"Name":"gnd","Notes":"Power: Ground"},
{"Number":14,"Name":"x","Notes":"NC: Not Connected"},
{"Number":15,"Name":"GPIO4","Notes":"GPIO:"},
{"Number":16,"Name":"x","Notes":"NC: Not Connected"},
{"Number":17,"Name":"GPIO5","Notes":"GPIO:"},
{"Number":18,"Name":"x","Notes":"NC: Not Connected"},
{"Number":19,"Name":"gnd","Notes":"Power: Ground"},
{"Number":20,"Name":"x","Notes":"NC: Not Connected"},
{"Number":21,"Name":"GPIO6","Notes":"GPIO:"},
{"Number":22,"Name":"x","Notes":"NC: Not Connected"},
{"Number":23,"Name":"GPIO7","Notes":"GPIO:"},
{"Number":24,"Name":"x","Notes":"NC: Not Connected"},
{"Number":25,"Name":"gnd","Notes":"Power: Ground"},
{"Number":26,"Name":"gnd","Notes":"Power: Ground"},
{"Number":27,"Name":"GPIO8","Notes":"GPIO:"},
{"Number":28,"Name":"GPIO28","Notes":"GPIO:"},
{"Number":29,"Name":"GPIO9","Notes":"GPIO:"},
{"Number":30,"Name":"GPIO29","Notes":"GPIO:"},
{"Number":31,"Name":"gnd","Notes":"Power: Ground"},
{"Number":32,"Name":"gnd","Notes":"Power: Ground"},
{"Number":33,"Name":"GPIO10","Notes":"GPIO:"},
{"Number":34,"Name":"GPIO30","Notes":"GPIO:"},
{"Number":35,"Name":"GPIO11","Notes":"GPIO:"},
{"Number":36,"Name":"GPIO31","Notes":"GPIO:"},
{"Number":37,"Name":"gnd","Notes":"Power: Ground"},
{"Number":38,"Name":"gnd","Notes":"Power: Ground"},
{"Number":39,"Name":"GPIO0-27_VREF","Notes":"Warning: Output"},
{"Number":40,"Name":"GPIO0-27_VREF","Notes":"Warning: Output"},
{"Number":41,"Name":"GPIO28-45_VREF","Notes":"Warning: Output"},
{"Number":42,"Name":"GPIO28-45_VREF","Notes":"Warning: Output"},
{"Number":43,"Name":"gnd","Notes":"Power: Ground"},
{"Number":44,"Name":"gnd","Notes":"Power: Ground"},
{"Number":45,"Name":"GPIO12","Notes":"GPIO:"},
{"Number":46,"Name":"GPIO32","Notes":"GPIO:"},
{"Number":47,"Name":"GPIO13","Notes":"GPIO:"},
{"Number":48,"Name":"GPIO33","Notes":"GPIO:"},
{"Number":49,"Name":"gnd","Notes":"Power: Ground"},
{"Number":50,"Name":"gnd","Notes":"Power: Ground"},
{"Number":51,"Name":"GPIO14","Notes":"GPIO:"},
{"Number":52,"Name":"GPIO34","Notes":"GPIO:"},
{"Number":53,"Name":"GPIO15","Notes":"GPIO:"},
{"Number":54,"Name":"GPIO35","Notes":"GPIO:"},
{"Number":55,"Name":"gnd","Notes":"Power: Ground"},
{"Number":56,"Name":"gnd","Notes":"Power: Ground"},
{"Number":57,"Name":"GPIO16","Notes":"GPIO:"},
{"Number":58,"Name":"GPIO36","Notes":"GPIO:"},
{"Number":59,"Name":"GPIO17","Notes":"GPIO:"},
{"Number":60,"Name":"GPIO37","Notes":"GPIO:"},
{"Number":61,"Name":"gnd","Notes":"Power: Ground"},
{"Number":62,"Name":"gnd","Notes":"Power: Ground"},
{"Number":63,"Name":"GPIO18","Notes":"GPIO:"},
{"Number":64,"Name":"GPIO38","Notes":"GPIO:"},
{"Number":65,"Name":"GPIO19","Notes":"GPIO:"},
{"Number":66,"Name":"GPIO39","Notes":"GPIO:"},
{"Number":67,"Name":"gnd","Notes":"Power: Ground"},
{"Number":68,"Name":"gnd","Notes":"Power: Ground"},
{"Number":69,"Name":"GPIO20","Notes":"GPIO:"},
{"Number":70,"Name":"GPIO40","Notes":"GPIO:"},
{"Number":71,"Name":"GPIO21","Notes":"GPIO:"},
{"Number":72,"Name":"GPIO41","Notes":"GPIO:"},
{"Number":73,"Name":"gnd","Notes":"Power: Ground"},
{"Number":74,"Name":"gnd","Notes":"Power: Ground"},
{"Number":75,"Name":"GPIO22","Notes":"GPIO:"},
{"Number":76,"Name":"GPIO42","Notes":"GPIO:"},
{"Number":77,"Name":"GPIO23","Notes":"GPIO:"},
{"Number":78,"Name":"GPIO43","Notes":"GPIO:"},
{"Number":79,"Name":"gnd","Notes":"Power: Ground"},
{"Number":80,"Name":"gnd","Notes":"Power: Ground"},
{"Number":81,"Name":"GPIO24","Notes":"GPIO:"},
{"Number":82,"Name":"GPIO44","Notes":"GPIO:"},
{"Number":83,"Name":"GPIO25","Notes":"GPIO:"},
{"Number":84,"Name":"GPIO45","Notes":"GPIO:"},
{"Number":85,"Name":"gnd","Notes":"Power: Ground"},
{"Number":86,"Name":"gnd","Notes":"Power: Ground"},
{"Number":87,"Name":"GPIO26","Notes":"GPIO:"},
{"Number":88,"Name":"GPIO46_1V8","Notes":"Warning: Input"},
{"Number":89,"Name":"GPIO27","Notes":"GPIO:"},
{"Number":90,"Name":"GPIO47_1V8","Notes":"Warning: Input"},
{"Number":91,"Name":"gnd","Notes":"Power: Ground"},
{"Number":92,"Name":"gnd","Notes":"Power: Ground"},
{"Number":93,"Name":"DSI0_DN1","Notes":"DSI0: Input"},
{"Number":94,"Name":"DSI1_DP0","Notes":"DSI1: Input"},
{"Number":95,"Name":"DSI0_DP1","Notes":"DSI0: Input"},
{"Number":96,"Name":"DSI1_DN0","Notes":"DSI1: Input"},
{"Number":97,"Name":"gnd","Notes":"Power: Ground"},
{"Number":98,"Name":"gnd","Notes":"Power: Ground"},
{"Number":99,"Name":"DSI0_DN0","Notes":"DSI0: Input"},
{"Number":100,"Name":"DSI1_CP","Notes":"DSI1: Input"},
{"Number":101,"Name":"DSI0_DP0","Notes":"DSI0: Input"},
{"Number":102,"Name":"DSI1_CN","Notes":"DSI1: Input"},
{"Number":103,"Name":"gnd","Notes":"Power: Ground"},
{"Number":104,"Name":"gnd","Notes":"Power: Ground"},
{"Number":105,"Name":"DSI0_CN","Notes":"DSI0: Input"},
{"Number":106,"Name":"DSI1_DP3","Notes":"DSI1: Input"},
{"Number":107,"Name":"DSI0_CP","Notes":"DSI0: Input"},
{"Number":108,"Name":"DSI1_DN3","Notes":"DSI1: Input"},
{"Number":109,"Name":"gnd","Notes":"Power: Ground"},
{"Number":110,"Name":"gnd","Notes":"Power: Ground"},
{"Number":111,"Name":"HDMI_CK_N","Notes":"HDMI: Input"},
{"Number":112,"Name":"DSI1_DP2","Notes":"DSI1: Input"},
{"Number":113,"Name":"HDMI_CK_P","Notes":"HDMI: Input"},
{"Number":114,"Name":"DSI1_DN2","Notes":"DSI1: Input"},
{"Number":115,"Name":"gnd","Notes":"Power: Ground"},
{"Number":116,"Name":"gnd","Notes":"Power: Ground"},
{"Number":117,"Name":"HDMI_D0_N","Notes":"HDMI: Input"},
{"Number":118,"Name":"DSI1_DP1","Notes":"DSI1: Input"},
{"Number":119,"Name":"HDMI_D0_P","Notes":"HDMI: Input"},
{"Number":120,"Name":"DSI1_DN1","Notes":"DSI1: Input"},
{"Number":121,"Name":"gnd","Notes":"Power: Ground"},
{"Number":122,"Name":"gnd","Notes":"Power: Ground"},
{"Number":123,"Name":"HDMI_D1_N","Notes":"HDMI: Input"},
{"Number":124,"Name":"x","Notes":"NC: Not Connected"},
{"Number":125,"Name":"HDMI_D1_P","Notes":"HDMI: Input"},
{"Number":126,"Name":"x","Notes":"NC: Not Connected"},
{"Number":127,"Name":"gnd","Notes":"Power: Ground"},
{"Number":128,"Name":"x","Notes":"NC: Not Connected"},
{"Number":129,"Name":"HDMI_D2_N","Notes":"HDMI: Input"},
{"Number":130,"Name":"x","Notes":"NC: Not Connected"},
{"Number":131,"Name":"HDMI_D2_P","Notes":"HDMI: Input"},
{"Number":132,"Name":"x","Notes":"NC: Not Connected"},
{"Number":133,"Name":"gnd","Notes":"Power: Ground"},
{"Number":134,"Name":"gnd","Notes":"Power: Ground"},
{"Number":135,"Name":"CAM1_DP3","Notes":"CAM1: Output"},
{"Number":136,"Name":"CAM0_DP0","Notes":"CAM0: Output"},
{"Number":137,"Name":"CAM1_DN3","Notes":"CAM1: Output"},
{"Number":138,"Name":"CAM0_DN0","Notes":"CAM0: Output"},
{"Number":139,"Name":"gnd","Notes":"Power: Ground"},
{"Number":140,"Name":"gnd","Notes":"Power: Ground"},
{"Number":141,"Name":"CAM1_DP2","Notes":"CAM1: Output"},
{"Number":142,"Name":"CAM0_CP","Notes":"CAM0: Output"},
{"Number":143,"Name":"CAM1_DN2","Notes":"CAM1: Output"},
{"Number":144,"Name":"CAM0_CN","Notes":"CAM0: Output"},
{"Number":145,"Name":"gnd","Notes":"Power: Ground"},
{"Number":146,"Name":"gnd","Notes":"Power: Ground"},
{"Number":147,"Name":"CAM1_CP","Notes":"CAM1: Output"},
{"Number":148,"Name":"CAM0_DP1","Notes":"CAM0: Output"},
{"Number":149,"Name":"CAM1_CN","Notes":"CAM1: Output"},
{"Number":150,"Name":"CAM0_DN1","Notes":"CAM0: Output"},
{"Number":151,"Name":"gnd","Notes":"Power: Ground"},
{"Number":152,"Name":"gnd","Notes":"Power: Ground"},
{"Number":153,"Name":"CAM1_DP1","Notes":"CAM1: Output"},
{"Number":154,"Name":"x","Notes":"NC: Not Connected"},
{"Number":155,"Name":"CAM1_DN1","Notes":"CAM1: Output"},
{"Number":156,"Name":"x","Notes":"NC: Not Connected"},
{"Number":157,"Name":"gnd","Notes":"Power: Ground"},
{"Number":158,"Name":"x","Notes":"NC: Not Connected"},
{"Number":159,"Name":"CAM1_DP0","Notes":"CAM1: Output"},
{"Number":160,"Name":"x","Notes":"NC: Not Connected"},
{"Number":161,"Name":"CAM1_DN0","Notes":"CAM1: Output"},
{"Number":162,"Name":"x","Notes":"NC: Not Connected"},
{"Number":163,"Name":"gnd","Notes":"Power: Ground"},
{"Number":164,"Name":"gnd","Notes":"Power: Ground"},
{"Number":165,"Name":"USB_DP","Notes":"Other: Input"},
{"Number":166,"Name":"TVDAC","Notes":"Other: Input"},
{"Number":167,"Name":"USB_DM","Notes":"Other: Input"},
{"Number":168,"Name":"USB_OTGID","Notes":"Other: Output"},
{"Number":169,"Name":"gnd","Notes":"Power: Ground"},
{"Number":170,"Name":"gnd","Notes":"Power: Ground"},
{"Number":171,"Name":"HDMI_CEC","Notes":"HDMI: Input"},
{"Number":172,"Name":"VC_TRST_N","Notes":"Other: Output"},
{"Number":173,"Name":"HDMI_SDA","Notes":"HDMI: Input"},
{"Number":174,"Name":"VC_TDI","Notes":"Other: Output"},
{"Number":175,"Name":"HDMI_SCL","Notes":"HDMI: Input"},
{"Number":176,"Name":"VC_TMS","Notes":"Other: Output"},
{"Number":177,"Name":"RUN","Notes":"Other: Output"},
{"Number":178,"Name":"VC_TDO","Notes":"Other: Input"},
{"Number":179,"Name":"VDD_CORE","Notes":"Power: DO NOT USE"},
{"Number":180,"Name":"VC_TCK","Notes":"Other: Output"},
{"Number":181,"Name":"gnd","Notes":"Power: Ground"},
{"Number":182,"Name":"gnd","Notes":"Power: Ground"},
{"Number":183,"Name":"1V8","Notes":"Power: 1.8V"},
{"Number":184,"Name":"1V8","Notes":"Power: 1.8V"},
{"Number":185,"Name":"1V8","Notes":"Power: 1.8V"},
{"Number":186,"Name":"1V8","Notes":"Power: 1.8V"},
{"Number":187,"Name":"gnd","Notes":"Power: Ground"},
{"Number":188,"Name":"gnd","Notes":"Power: Ground"},
{"Number":189,"Name":"VDAC","Notes":"Power: VDAC"},
{"Number":190,"Name":"VDAC","Notes":"Power: VDAC"},
{"Number":191,"Name":"3V3","Notes":"Power: 3.3V"},
{"Number":192,"Name":"3V3","Notes":"Power: 3.3V"},
{"Number":193,"Name":"3V3","Notes":"Power: 3.3V"},
{"Number":194,"Name":"3V3","Notes":"Power: 3.3V"},
{"Number":195,"Name":"gnd","Notes":"Power: Ground"},
{"Number":196,"Name":"gnd","Notes":"Power: Ground"},
{"Number":197,"Name":"VBAT","Notes":"Power: VBAT"},
{"Number":198,"Name":"VBAT","Notes":"Power: VBAT"},
{"Number":199,"Name":"VBAT","Notes":"Power: VBAT"},
{"Number":200,"Name":"VBAT","Notes":"Power: VBAT"}
];