//add map
// load the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
		// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +'Imagery © <a href="http://mapbox.com">Mapbox</a>',id: 'mapbox.streets'}).addTo(mymap);



var legend;
var i;
var dataLU;
var dataCO;
var  layoutTable = null;
anychart.onDocumentReady(chartpumpsta);
var floodtable;
var fireinctable;
var firefloodinctable

function highlightFeature(e) {
var layer = e.target;

layer.setStyle({
	weight: 5,
	color: '#666',
	dashArray: '',
	fillOpacity: 0.7
});

if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	layer.bringToFront();
}
}
	
	//adding interaction
function highlightpumpstaFeature(e) {
var layer = e.target;

layer.setStyle({
	radius: 5,
	fillColor: "#ff9933",
	color: "#000000",
	weight: 1,
	opacity: 1,
	fillOpacity: 1
});

if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	layer.bringToFront();
}
}


// var pumpstacoords;
// var pumpGroup; 
function resetpumpstaHighlight(e) {
 if (!e.target.feature.properties.selected){
var layer = e.target;

layer.setStyle({
	radius: 5,
	fillColor: "#ff9933",
	color: "#ff9933",
	weight: 1,
	opacity: 1,
	fillOpacity: 1
 });};	



}
var clickpump;
var clickmap;
var seriespumpstaarray =[];
var seriesfloodarray = [];
var highchartpumpsta;
//click on map
function selectpumpfloodriskFeature(e) {
	e.target.feature.properties.selected = !e.target.feature.properties.selected;	
	clickmap = e.target.feature.properties.NAME;
	clickpump  = e.target.feature.properties.Borough_BN;
	var seriespumpstaarray=seriespump.xe.FN;
	var seriesfloodarray=seriespump.xe.FN;

	var i =seriesfloodarray.indexOf(clickmap);
		seriespump.select([i]);
		
	var seriespumpstaarray=seriespump.xe.FN;

	var i =seriespumpstaarray.indexOf(clickpump);
		seriespump.select([i]);
	
	//select on map
	floodrisklayer.setStyle(function (feature){
	var i;
		if (clickmap === feature.properties.NAME ){
		feature.properties.selected = true;
			if (feature.properties.selected){
		return {
				weight: 5,
				fillColor: '#666',
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
				
			} }
		
	}else {
		feature.properties.selected = false;
		return FloodRiskstyle(feature)
		
		}
	});
	
	//style on map
	pumpstationlayer.setStyle(function (feature){
	var i;
		if (clickpump === feature.properties.Borough_BN ){
		feature.properties.selected = true;
			if (feature.properties.selected){
		return {
				radius: 5,
				fillColor: "#476b6b",
				color: "#000000",
				weight: 1,
				opacity: 1,
				fillOpacity: 1
				
			} }
		
	}else {
		feature.properties.selected = false;
			return pumpstaStyle;
		}
	});
	console.log(clickmap);
	//change detail chart
	var i;
	for (i = 0; i < floodriskper.length; i++) { 
	if (clickmap === floodriskper[i][0]){
		floodriskvalue = floodriskper[i][1];
	}
	}


	anychart.onDocumentReady(chartpumpsta);
	selectonchartfloodrisk();

}

	

function selectonchartfloodrisk(){
	
	var seriesfloodarray=seriespump.xe.FN;

	var i =seriesfloodarray.indexOf(clickmap);
		seriespump.select([i]);
		

}


var pumpstaStyle = {
        radius: 5,
        fillColor: "#ff9933",
        color: "#ff9933",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };

var pumpstacoords;
var pumpGroup; 
function pumpstadisplay (feature, latlng) {
	pumpGroup = L.featureGroup([]).addTo(mymap);
	pumpstacoords = pumpGroup.addLayer(L.circleMarker(latlng, pumpstaStyle));
 return pumpstacoords;
}	
	
	
// pump station tooltip
function onEachpumpstaFeature(feature, layer) {
Borough = feature.properties.Borough_BN ;
onpopup = "<b>Pump Station in Borough:</b>"+Borough;

layer.on({
	mouseover:highlightpumpstaFeature,
	mouseout:resetpumpstaHighlight,
	click: selectpumpfloodriskFeature
});

layer.bindPopup(onpopup);

}




//add pump station layer
var pumpstationlayer;
var pumpstationdata;
var pumpstationjson;
var pumpstationarray = [];
var pumpstapumpinc = [];
function getPumpStation(){
	client = new XMLHttpRequest();
	client.open('GET','GeoJSON/FloodPumpStation.geojson');
	client.onreadystatechange = pumpstationResponse;
	client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function pumpstationResponse(){
if(client.readyState == 4){
	var pumpstationdata = client.responseText;
	loadPumpStationlayer(pumpstationdata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadPumpStationlayer(pumpstationdata){
var pumpstationjson = JSON.parse(pumpstationdata);
var jproperties = pumpstationjson.features.map(function (el) { return el.properties; });
var i;
if (pumpstationarray=[]){
for (i = 0; i < jproperties.length; i++) { 
	pumpstationarray.push(Object.values(jproperties[i]));
}}
if (pumpstapumpinc =[]){
for (i = 0; i < pumpstationarray.length; i++) { 
	pumpstapumpinc.push([pumpstationarray[i][1],pumpstationarray[i][2]]);
}}

if (boroughfloodinclayer){
		mymap.removeLayer(boroughfloodinclayer);
	}
	


// REMOVING PREVIOUS INFO BOX
if (legend != undefined) {
legend.remove();
}
pumpstationlayer=L.geoJson(pumpstationjson,{pointToLayer: pumpstadisplay,onEachFeature:onEachpumpstaFeature});
pumpstationlayer.addTo(mymap);
pumpstationlayer.bringToFront();
// change the map zoom so that all the data is shown
mymap.fitBounds(pumpstationlayer.getBounds());
anychart.onDocumentReady(chartpumpsta);
}

//floodrisk area
function FloodRiskstyle(feature) {
	return {
		fillColor: '#66a3ff  ',
		weight: 1,
		opacity: 1,
		color: '#66a3ff',
		fillOpacity: 0.7
	};
}

function resetfloodriskHighlight(e) {
	if (!e.target.feature.properties.selected){
floodrisklayer.resetStyle(e.target);
};
}



function onEachfloodriskFeature(feature, layer) {
bo_name = feature.properties.NAME ;
floodrisk = feature.properties.SUM_percen;
onpopup = "<b>Borough Name:</b>"+bo_name +"<br />"+"<b>Flood Risk Area%:</b>"+floodrisk 



layer.on({
	mouseover: highlightFeature,
	mouseout: resetfloodriskHighlight,
	click: selectpumpfloodriskFeature
});

layer.bindPopup(onpopup);


}

var floodriskarray = [];
var floodriskper = [];
var floodrisklayer;
function getfloodrisk(){
	client = new XMLHttpRequest();
	client.open('GET','GeoJSON/Flood_Risk.geojson');
	client.onreadystatechange = floodriskResponse;
	client.send();
	
}
// create the code to wait for the response from the data server, and process the response once it is received
function floodriskResponse(){
if(client.readyState == 4){
	var floodriskdata = client.responseText;
	loadfloodrisklayer(floodriskdata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadfloodrisklayer(floodriskdata){
var floodriskjson = JSON.parse(floodriskdata);
var features = []; 
features = floodriskjson.features; 
var jproperties = floodriskjson.features.map(function (el) { return el.properties; });
var i;
if (floodriskarray=[]){
for (i = 0; i < jproperties.length; i++) { 
	floodriskarray.push(Object.values(jproperties[i]));
}
}
if (floodriskper=[]){
for (i = 0; i < floodriskarray.length; i++) { 
	floodriskper.push([floodriskarray[i][1],floodriskarray[i][2]]);
}
}
if (boroughfloodinclayer){
		mymap.removeLayer(boroughfloodinclayer);
	}

// REMOVING PREVIOUS INFO BOX
if (legend != undefined) {
legend.remove();
}

floodrisklayer=L.geoJson(floodriskjson, {style: FloodRiskstyle,onEachFeature: onEachfloodriskFeature}).addTo(mymap);
// change the map zoom so that all the data is shown
mymap.fitBounds(floodrisklayer.getBounds());
getPumpStation();
}

function chartpumpsta(){
anychart.theme('darkBlue');
	if ( layoutTable != null)  layoutTable.container(null);


layoutTable = anychart.standalones.table(1,2 );
layoutTable.cellBorder(null);
layoutTable.getCol(0).width('50%');
layoutTable.getCol(1).width('50%');
layoutTable.getRow(0).height('100%');




layoutTable.getCell(0, 0).content(mainChartpump());
layoutTable.getCell(0, 1).content(Detaillinegauge());

layoutTable.container('container1');
layoutTable.draw();
	
}


var chartonepump;
var seriespump;
function mainChartpump() {
	data = anychart.data.set(floodriskper);
	var seriesData_1 = data.mapAs({x: 0, value: 1});
	// create a chart
	chartonepump = anychart.bar();
	// create the first series, set the data and name
	seriespump = chartonepump.bar(seriesData_1);
	seriespump.name("Flood Risk Area (%) per Borough")
	.color('#ff8533');
	
	var title;
	title = chartonepump.title();
	title.enabled(true);
	title.text("Flood Risk Area (%) per Borough");
	title.fontSize(10);
	
	var labelsx = chartonepump.xAxis().labels();
	labelsx.fontSize(8);
	var labelsy = chartonepump.yAxis().labels();
	labelsy.fontSize(8);
	
	
	chartonepump.draw();
	seriespump.listen('pointclick', chartPointClickpump);
	return chartonepump 
}

var linegauge;
var floodriskvalue;
var seriesData_1;
function Detaillinegauge(){


	// set the linegauge type
	linegauge = anychart.bullet([{value: floodriskvalue}]);
	
	
 // Set chart ranges
  linegauge.range().from(0).to(100);
  linegauge.range(1).from(0).to(25);
  linegauge.range(2).from(25).to(50);
  linegauge.range(3).from(50).to(75);
  linegauge.range(4).from(75).to(100);
 
  


  // chart title
  linegauge.title("Flood Risk Area Percentage");
  linegauge.layout('vertical');
  // Initiate chart drawing
  linegauge.container("container");
  linegauge.draw();
  return linegauge

}

var clickchartpump;
//click on chart
function chartPointClickpump(e) {
    var index = e.point.getIndex();
	var row = data.row(index);
	clickchartpump = row[0];
	console.log(clickchartpump);
	selectfloodpumpMap();
	}
	
//function when select on chart
function selectfloodpumpMap() {

	//select on pump sta map
	pumpstationlayer.setStyle(function (feature){
	
	//select on map
	if (clickchartpump === feature.properties.Borough_BN ){
	feature.properties.selected = true;
	
		return {
				radius: 5,
				fillColor: "#476b6b",
				color: "#000000",
				weight: 1,
				opacity: 1,
				fillOpacity: 1				
		} 
		
	}else { 
		feature.properties.selected = false;
		 return  pumpstaStyle;
		}
	});
	
		//select on map
	floodrisklayer.setStyle(function (feature){
	var i;
		if (clickchartpump === feature.properties.NAME ){
		feature.properties.selected = true;
			if (feature.properties.selected){
		return {
				weight: 5,
				fillColor: '#666',
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
				
			} }
		
	}else {
		feature.properties.selected = false;
		return FloodRiskstyle(feature);	
		}
	});
	
	//change detail chart
	var i;
	for (i = 0; i < floodriskper.length; i++) { 
	if (clickchartpump === floodriskper[i][0]){
		floodriskvalue = floodriskper[i][1];
	}
	}
	layoutTable.getCell(0, 1).content(Detaillinegauge());


}

//adding flood Incident color
function getFloodIncBoColor(d) {
	return d >= 407 ? '#FC1F04' :
		   d >= 290  ? '#FC9204' :
		   d >= 229 ? '#F9FC04' :
		   d >= 165  ? '#81FC04' :
		   d >= 100 ?'#53A204':
'#53A204';}

 
//adding population borough color
function FloodIncBostyle(feature) {
	return {
		fillColor: getFloodIncBoColor(feature.properties.FloodInc_1),
		weight: 1,
		opacity: 1,
		color: '#979895',
		fillOpacity: 0.7
	};
}

function resetfloodincboHighlight(e) {
	if (!e.target.feature.properties.selected){
boroughfloodinclayer.resetStyle(e.target);
};

}

//click on map
function selectfloodincFeature(e) {
	
	e.target.feature.properties.selected = !e.target.feature.properties.selected;
	var seriesfloodincarray=seriesfloodinc.xe.FN;


	clickmap = e.target.feature.properties.NAME;
	var i =seriesfloodincarray.indexOf(clickmap);
		seriesfloodinc.select([i]);


	//select on map
	boroughfloodinclayer.setStyle(function (feature){
	var i;
		if (clickmap === feature.properties.NAME ){
		feature.properties.selected = true;
			if (feature.properties.selected){
		return {
				weight: 5,
				fillColor: '#666',
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
				
			} }
		
	}else {
		feature.properties.selected = false;
		return FloodIncBostyle(feature);
		
		}
	});
	
	//arrange data for detail chart one
	x = barchart.getSelectedPoints();
	highchart = x[0].Gn.categoryname;

	
	for (i = 0; i < floodincarray.length; i++) { 
	
	if (highchart === floodincarray[i][2] ){
	
	if (floodincarray[i][1] === '0'){
	floodincmonth.push(['Jan',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '1'){
	floodincmonth.push(['Feb',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '2'){
	floodincmonth.push(['Mar',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '3'){
	floodincmonth.push(['Apr',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '4'){
	floodincmonth.push(['May',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '5'){
	floodincmonth.push(['Jun',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '6'){
	floodincmonth.push(['Jul',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '7'){
	floodincmonth.push(['Aug',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '8'){
	floodincmonth.push(['Sep',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '9'){
	floodincmonth.push(['Oct',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '91'){
	floodincmonth.push(['Nov',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '92'){
	floodincmonth.push(['Dec',floodincarray[i][3]]);}
		}
	}
	
	for (i = 0; i < sitearray.length; i++) { 
	
	if (highchart === sitearray[i][2] ){
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Area of Site"){
			sitea_areasite = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Distance from A Road"){
			sitea_road = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Distance from center of borough"){
			sitea_center = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Area of Site"){
			siteb_areasite = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Distance from A Road"){
			siteb_road = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Distance from center of borough"){
			siteb_center = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Area of Site"){
			sitec_areasite = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Distance from A Road"){
			sitec_road = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Distance from center of borough"){
			sitec_center = sitearray[i][3].toString()+'%';
		}
	}
	}
	
		//arrange data for chart two and three
	if (highchart === 'Kingston upon Thames'){
		dataCO = KingstonuponThamesCO;
	}
	
	if (highchart === 'Croydon'){
		dataCO = CroydonCO;
	}
	
	if (highchart === 'Bromley'){
		dataCO = BromleyCO;
	}
	
	if (highchart === 'Hounslow'){
		dataCO = HounslowCO;
	}
	
	if (highchart === 'Ealing'){
		dataCO = EalingCO;
	}
	
	if (highchart === 'Havering'){
		dataCO = HaveringCO;
	}
	if (highchart === 'Hillingdon'){
		dataCO = HillingdonCO;
	}
	if (highchart === 'Harrow'){
		dataCO = HarrowCO;
	}
	if (highchart === 'Brent'){
		dataCO = BrentCO;
	}
	if (highchart === 'Barnet'){
		dataCO = BarnetCO;
	}
	if (highchart === 'Lambeth'){
		dataCO = LambethCO;
	}
	if (highchart === 'Southwark'){
		dataCO = SouthwarkCO;
	}
	if (highchart === 'Lewisham'){
		dataCO = LewishamCO;
	}
	if (highchart === 'Greenwich'){
		dataCO = GreenwichCO;
	}
	if (highchart === 'Bexley'){
		dataCO = BexleyCO;
	}
	if (highchart === 'Enfield'){
		dataCO = EnfieldCO;
	}
	if (highchart === 'Waltham Forest'){
		dataCO = WalthamForestCO;
	}
	if (highchart === 'Redbridge'){
		dataCO = RedbridgeCO;
	}
	if (highchart === 'Sutton'){
		dataCO = SuttonCO;
	}
	if (highchart === 'Richmond upon Thames'){
		dataCO = RichmonduponThamesCO;
	}
	if (highchart === 'Merton'){
		dataCO = MertonCO;
	}
	if (highchart === 'Wandsworth'){
		dataCO = WandsworthCO;
	}
	if (highchart === 'Hammersmith and Fulham'){
		dataCO = HammersmithandFulhamCO;
	}
	if (highchart === 'Kensington and Chelsea'){
		dataCO = KensingtonandChelseaCO;
	}
	if (highchart === 'Westminster'){
		dataCO = WestminsterCO;
	}
	if (highchart === 'Camden'){
		dataCO = CamdenCO;
	}
	if (highchart === 'Tower Hamlets'){
		dataCO = TowerHamletsCO;
	}
	if (highchart === 'Islington'){
		dataCO = IslingtonCO;
	}
	if (highchart === 'Hackney'){
		dataCO = HackneyCO;
	}
	if (highchart === 'Haringey'){
		dataCO = HaringeyCO;
	}
	if (highchart === 'Newham'){
		dataCO = NewhamCO;
	}
	if (highchart === 'Barking and Dagenham'){
		dataCO = BarkingandDagenhamCO;
	}
	if (highchart === 'City of London'){
		dataCO = CityofLondonCO;
	}
	child = dataCO[1][0];
	old = dataCO[1][1];
	working = dataCO[1][2];
	anychart.onDocumentReady(chartfloodinc);
	selectonchartfloodinc();

}

function selectonchartfloodinc(){
	var seriesfloodincarray=seriesfloodinc.xe.FN;
	var i =seriesfloodincarray.indexOf(clickmap);
		seriesfloodinc.select([i]);
}


function onEachfloodincboFeature(feature, layer) {
bo_name = feature.properties.NAME ;
floodinc = feature.properties.FloodInc_1;
onpopup = "<b>Borough Name:</b>"+bo_name +"<br />"+"<b>Flood Incident:</b>"+floodinc

layer.on({
	mouseover: highlightFeature,
	mouseout: resetfloodincboHighlight,
	click: selectfloodincFeature

});

layer.bindPopup(onpopup);


}


var KingstonuponThamesCO=[];
var CroydonCO=[];
var BromleyCO =[];
var HounslowCO = [];
var EalingCO= [];
var HaveringCO=[];
var HillingdonCO=[];
var HarrowCO=[];
var BrentCO=[];
var BarnetCO =[];
var LambethCO = [];
var SouthwarkCO =[];
var LewishamCO =[];
var GreenwichCO=[];
var BexleyCO=[];
var EnfieldCO=[];
var WalthamForestCO=[];
var RedbridgeCO=[];
var SuttonCO=[];
var RichmonduponThamesCO=[];
var MertonCO=[];
var WandsworthCO=[];
var HammersmithandFulhamCO=[];
var KensingtonandChelseaCO=[];
var WestminsterCO=[];
var CamdenCO=[];
var TowerHamletsCO=[];
var IslingtonCO=[];
var HackneyCO=[];
var HaringeyCO=[];
var NewhamCO=[];
var BarkingandDagenhamCO=[];
var CityofLondonCO=[];

var boroughfloodincarray = [];
var boroughfloodinc = [];
var boroughfloodinclayer;
function getfloodincBorough(){
	client = new XMLHttpRequest();
	client.open('GET','GeoJSON/Borough_flood.geojson');
	client.onreadystatechange = boroughfloodincResponse;
	client.send();
	
}
// create the code to wait for the response from the data server, and process the response once it is received
function boroughfloodincResponse(){
if(client.readyState == 4){
	var boroughfloodincdata = client.responseText;
	loadBoroughfloodinclayer(boroughfloodincdata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadBoroughfloodinclayer(boroughfloodincdata){
var boroughfloodincjson = JSON.parse(boroughfloodincdata);
var features = []; 
features = boroughfloodincjson.features; 
var jproperties = boroughfloodincjson.features.map(function (el) { return el.properties; });
var i;

if (boroughfloodincarray = []){
for (i = 0; i < jproperties.length; i++) { 
	boroughfloodincarray.push(Object.values(jproperties[i]));}
}
if (boroughfloodinc = []){
for (i = 0; i < boroughfloodincarray.length; i++) { 
	boroughfloodinc.push([boroughfloodincarray[i][0],boroughfloodincarray[i][2],boroughfloodincarray[i][3]]);
	
}
}


//layout child old data
if (KingstonuponThamesCO = []){
KingstonuponThamesCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
KingstonuponThamesCO.push([boroughfloodincarray[0][4].toString(),boroughfloodincarray[0][5].toString(),boroughfloodincarray[0][15].toString()]);}


if (CroydonCO = []){
CroydonCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
CroydonCO.push([boroughfloodincarray[1][4].toString(),boroughfloodincarray[1][5].toString(),boroughfloodincarray[1][15].toString()]);}

if (BromleyCO = []){
BromleyCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
BromleyCO.push([boroughfloodincarray[2][4].toString(),boroughfloodincarray[2][5].toString(),boroughfloodincarray[2][15].toString()]);}

if (HounslowCO = []){
HounslowCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
HounslowCO.push([boroughfloodincarray[3][4].toString(),boroughfloodincarray[3][5].toString(),boroughfloodincarray[3][15].toString()]);}

if (EalingCO = []){
EalingCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
EalingCO.push([boroughfloodincarray[4][4].toString(),boroughfloodincarray[4][5].toString(),boroughfloodincarray[4][15].toString()]);}

if (HaveringCO = []){
HaveringCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
HaveringCO.push([boroughfloodincarray[5][4].toString(),boroughfloodincarray[5][5].toString(),boroughfloodincarray[5][15].toString()]);}

if (HillingdonCO = []){
HillingdonCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
HillingdonCO.push([boroughfloodincarray[6][4].toString(),boroughfloodincarray[6][5].toString(),boroughfloodincarray[6][15].toString()]);}

if (HarrowCO = []){
HarrowCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
HarrowCO.push([boroughfloodincarray[7][4].toString(),boroughfloodincarray[7][5].toString(),boroughfloodincarray[7][15].toString()]);}

if (BrentCO = []){
BrentCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
BrentCO.push([boroughfloodincarray[8][4].toString(),boroughfloodincarray[8][5].toString(),boroughfloodincarray[8][15].toString()]);}

if (BarnetCO = []){
BarnetCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
BarnetCO.push([boroughfloodincarray[9][4].toString(),boroughfloodincarray[9][5].toString(),boroughfloodincarray[9][15].toString()]);}

if (LambethCO= []){
LambethCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
LambethCO.push([boroughfloodincarray[10][4].toString(),boroughfloodincarray[10][5].toString(),boroughfloodincarray[10][15].toString()]);}

if (SouthwarkCO= []){
SouthwarkCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
SouthwarkCO.push([boroughfloodincarray[11][4].toString(),boroughfloodincarray[11][5].toString(),boroughfloodincarray[11][15].toString()]);}

if (LewishamCO= []){
LewishamCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
LewishamCO.push([boroughfloodincarray[12][4].toString(),boroughfloodincarray[12][5].toString(),boroughfloodincarray[12][15].toString()]);}

if (GreenwichCO= []){
GreenwichCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
GreenwichCO.push([boroughfloodincarray[13][4].toString(),boroughfloodincarray[13][5].toString(),boroughfloodincarray[13][15].toString()]);}

if (BexleyCO= []){
BexleyCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
BexleyCO.push([boroughfloodincarray[14][4].toString(),boroughfloodincarray[14][5].toString(),boroughfloodincarray[14][15].toString()]);}

if (EnfieldCO= []){
EnfieldCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
EnfieldCO.push([boroughfloodincarray[15][4].toString(),boroughfloodincarray[15][5].toString(),boroughfloodincarray[15][15].toString()]);}

if (WalthamForestCO= []){
WalthamForestCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
WalthamForestCO.push([boroughfloodincarray[16][4].toString(),boroughfloodincarray[16][5].toString(),boroughfloodincarray[16][15].toString()]);}

if (RedbridgeCO= []){
RedbridgeCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
RedbridgeCO.push([boroughfloodincarray[17][4].toString(),boroughfloodincarray[17][5].toString(),boroughfloodincarray[17][15].toString()]);}

if (SuttonCO= []){
SuttonCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
SuttonCO.push([boroughfloodincarray[18][4].toString(),boroughfloodincarray[18][5].toString(),boroughfloodincarray[18][15].toString()]);}

if (RichmonduponThamesCO= []){
RichmonduponThamesCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
RichmonduponThamesCO.push([boroughfloodincarray[19][4].toString(),boroughfloodincarray[19][5].toString(),boroughfloodincarray[19][15].toString()]);}

if (MertonCO= []){
MertonCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
MertonCO.push([boroughfloodincarray[20][4].toString(),boroughfloodincarray[20][5].toString(),boroughfloodincarray[20][15].toString()]);}

if (WandsworthCO= []){
WandsworthCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
WandsworthCO.push([boroughfloodincarray[21][4].toString(),boroughfloodincarray[21][5].toString(),boroughfloodincarray[21][15].toString()]);}

if (HammersmithandFulhamCO= []){
HammersmithandFulhamCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
HammersmithandFulhamCO.push([boroughfloodincarray[22][4].toString(),boroughfloodincarray[22][5].toString(),boroughfloodincarray[22][15].toString()]);}

if (KensingtonandChelseaCO= []){
KensingtonandChelseaCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
KensingtonandChelseaCO.push([boroughfloodincarray[23][4].toString(),boroughfloodincarray[23][5].toString(),boroughfloodincarray[23][15].toString()]);}

if (WestminsterCO= []){
WestminsterCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
WestminsterCO.push([boroughfloodincarray[24][4].toString(),boroughfloodincarray[24][5].toString(),boroughfloodincarray[24][15].toString()]);}

if (WestminsterCO= []){
WestminsterCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
WestminsterCO.push([boroughfloodincarray[24][4].toString(),boroughfloodincarray[24][5].toString(),boroughfloodincarray[24][15].toString()]);}

if (CamdenCO= []){
CamdenCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
CamdenCO.push([boroughfloodincarray[25][4].toString(),boroughfloodincarray[25][5].toString(),boroughfloodincarray[25][15].toString()]);}

if (TowerHamletsCO= []){
TowerHamletsCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
TowerHamletsCO.push([boroughfloodincarray[26][4].toString(),boroughfloodincarray[26][5].toString(),boroughfloodincarray[26][15].toString()]);}

if (IslingtonCO= []){
IslingtonCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
IslingtonCO.push([boroughfloodincarray[27][4].toString(),boroughfloodincarray[27][5].toString(),boroughfloodincarray[27][15].toString()]);}

if (HackneyCO= []){
HackneyCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
HackneyCO.push([boroughfloodincarray[28][4].toString(),boroughfloodincarray[28][5].toString(),boroughfloodincarray[28][15].toString()]);}

if (HaringeyCO= []){
HaringeyCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
HaringeyCO.push([boroughfloodincarray[29][4].toString(),boroughfloodincarray[29][5].toString(),boroughfloodincarray[29][15].toString()]);}

if (NewhamCO= []){
NewhamCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
NewhamCO.push([boroughfloodincarray[30][4].toString(),boroughfloodincarray[30][5].toString(),boroughfloodincarray[30][15].toString()]);}

if (BarkingandDagenhamCO= []){
BarkingandDagenhamCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
BarkingandDagenhamCO.push([boroughfloodincarray[31][4].toString(),boroughfloodincarray[31][5].toString(),boroughfloodincarray[31][15].toString()]);}

if (CityofLondonCO= []){
CityofLondonCO.unshift(["Child AGE %","Old AGE %","Working AGE %"]);
CityofLondonCO.push([boroughfloodincarray[32][4].toString(),boroughfloodincarray[32][5].toString(),boroughfloodincarray[32][15].toString()]);}

if (floodrisklayer){
		mymap.removeLayer(floodrisklayer);
	}
if (pumpstationlayer){
		mymap.removeLayer(pumpstationlayer);
	}

if (legend != undefined) {
legend.remove();
}


boroughfloodinclayer=L.geoJson(boroughfloodincjson, {style: FloodIncBostyle,onEachFeature: onEachfloodincboFeature}).addTo(mymap);
// change the map zoom so that all the data is shown
mymap.fitBounds(boroughfloodinclayer.getBounds());

legend = L.control({position: 'bottomright'});

legend.onAdd = function (mymap) {

	var div = L.DomUtil.create('div', 'info legend'),
		grades = [407,290,229,165,100  ],
		labels = [],
		from, to;

	for (var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(
			'<i style="background:' + getFloodIncBoColor(from + 1) + '"></i> ' +
			from + (to ? '&ndash;' + to : '+'));
	}

	div.innerHTML = labels.join('<br>');
	return div;
};

legend.addTo(mymap);
anychart.onDocumentReady(chartfloodinc);
}

//chart for (fire station, population and borough)
function chartfloodinc() {
	getfloodIncident();
	anychart.theme('darkBlue');
	if ( layoutTable != null)  layoutTable.container(null);


layoutTable = anychart.standalones.table(3,2 );
layoutTable.cellBorder(null);
layoutTable.getCol(0).width('50%');
layoutTable.getCol(0).width('50%');
layoutTable.getRow(0).height('33%');
layoutTable.getRow(1).height('33%');
layoutTable.getRow(2).height('33%');



layoutTable.getCell(0, 0).rowSpan(3).content(mainChart());
layoutTable.getCell(0, 1).content(Detailline());
layoutTable.getCell(1, 1).content(Detailtableone());
layoutTable.getCell(2, 1).content(Detailtable());
layoutTable.container('container1');
layoutTable.draw();
		
}

//barchart
function mainChart() {

var rawData = boroughfloodinc;
data = anychart.data.set(rawData);
// map the data
var seriesData_1 = data.mapAs({x: 0, value: 1});
var seriesData_2 = data.mapAs({x: 0, value: 2});
// create a chart
barchart = anychart.bar();

// create scale for line series and extraYAxis
// it force line series to not stuck values with over series
var scale = anychart.scales.linear();

// create extra axis on the right side of chart
barchart.yAxis(1)
		.orientation('top')
		.scale(scale);
// create extra axis on the right side of chart
var yyTitle = barchart.yAxis(1).title();
yyTitle.enabled(true);
yyTitle.text('Population Density/per hectare');
yyTitle.fontSize(8);

// create extra axis on the right side of chart
var yTitle = barchart.yAxis().title();
yTitle.enabled(true);
yTitle.text('Flood Incidents');
yTitle.fontSize(8);

// create the first series, set the data and name
seriesfloodinc = barchart.bar(seriesData_1);
seriesfloodinc.name("flood Incidents")
.color('#80dfff');

 // create line series and set scale for it
var lineSeries = barchart.spline(seriesData_2);
lineSeries.name('Population Density')
		.yScale(scale)
		.stroke('1.5 #ffffff');

// turn the legend on
barchart.legend()
		.enabled(true)
		.fontSize(8)
		.padding([0, 0, 20, 0]);
	
	
// enable stagger mode
barchart.xAxis().staggerMode(true);
// set the number of lines for labels to stagger 
barchart.xAxis().staggerLines(1);
// disabling first and last labels
barchart.xAxis().drawFirstLabel(false);
barchart.xAxis().drawLastLabel(false);
//chart scale
barchart.yScale(anychart.scales.linear());

//chart grid
barchart.yGrid().stroke({
  // set stroke color
  color: "#007399",
  // set dashes and gaps length
  dash: "3 5"
});

// turn on chart animation
barchart.animation(true);

var title;
title = barchart.title();
title.enabled(true);
title.text("Comparing the number of flood incidents with population density");
title.fontSize(10);
// format labels
barchart.xAxis().labels().width(10);
barchart.xAxis().labels().height(10);

var labelsx = barchart.xAxis().labels();
labelsx.fontSize(8);
var labelsy = barchart.yAxis().labels();
labelsy.fontSize(8);
var labelsyy = barchart.yAxis(1).labels();
labelsyy.fontSize(8);


//multi select
// multi-select enabling
var interactivity = barchart.interactivity();
interactivity.selectionMode("multiSelect");
//tooltip
// configure tooltips on the chart
seriesfloodinc.tooltip().format("flood Incident:{%value}");
lineSeries.tooltip().format("Population Density:{%value}");

seriesfloodinc.listen('pointclick', chartPointClick);

return barchart
}

//click on chart
function chartPointClick(e) {
    var index = e.point.getIndex();
	var row = data.row(index);
	clickchartfloodinc = row[0];
	console.log(clickchartfloodinc);
	selectfloodincMap();
	}
	
//function when select on chart
function selectfloodincMap() {

	//select on map
	boroughfloodinclayer.setStyle(function (feature){
	
	//select on map
	if (clickchartfloodinc === feature.properties.NAME ){
	feature.properties.selected = true;
	
		return {
				weight: 5,
				fillColor: '#666',
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
				
		} 
		
	}else { 
		feature.properties.selected = false;
		 return FloodIncBostyle(feature);
		}
	});
	
	for (i = 0; i < floodincarray.length; i++) { 
	
	if (clickchartfloodinc === floodincarray[i][2] ){
	
	if (floodincarray[i][1] === '0'){
	floodincmonth.push(['Jan',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '1'){
	floodincmonth.push(['Feb',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '2'){
	floodincmonth.push(['Mar',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '3'){
	floodincmonth.push(['Apr',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '4'){
	floodincmonth.push(['May',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '5'){
	floodincmonth.push(['Jun',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '6'){
	floodincmonth.push(['Jul',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '7'){
	floodincmonth.push(['Aug',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '8'){
	floodincmonth.push(['Sep',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '9'){
	floodincmonth.push(['Oct',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '91'){
	floodincmonth.push(['Nov',floodincarray[i][3]]);}
	if (floodincarray[i][1] === '92'){
	floodincmonth.push(['Dec',floodincarray[i][3]]);}
		}
	}
	
	for (i = 0; i < sitearray.length; i++) { 
	
	if (clickchartfloodinc === sitearray[i][2] ){
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Area of Site"){
			sitea_areasite = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Distance from A Road"){
			sitea_road = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site A"&&sitearray[i][1]==="Distance from center of borough"){
			sitea_center = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Area of Site"){
			siteb_areasite = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Distance from A Road"){
			siteb_road = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site B"&&sitearray[i][1]==="Distance from center of borough"){
			siteb_center = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Area of Site"){
			sitec_areasite = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Distance from A Road"){
			sitec_road = sitearray[i][3].toString()+'%';
		}
		if (sitearray[i][0]==="Site C"&&sitearray[i][1]==="Distance from center of borough"){
			sitec_center = sitearray[i][3].toString()+'%';
		}
	}
	}
	
	
	//arrange data for chart two and three
	if (clickchartfloodinc === 'Kingston upon Thames'){
		dataCO = KingstonuponThamesCO;
	}
	
	if (clickchartfloodinc === 'Croydon'){
		dataCO = CroydonCO;
	}
	
	if (clickchartfloodinc === 'Bromley'){
		dataCO = BromleyCO;
	}
	if (clickchartfloodinc === 'Hounslow'){
		dataCO = HounslowCO;
	}
	
	if (clickchartfloodinc === 'Ealing'){
		dataCO = EalingCO;
	}
	
	if (clickchartfloodinc === 'Havering'){
		dataCO = HaveringCO;
	}
	
	if (clickchartfloodinc === 'Hillingdon'){
		dataCO = HillingdonCO;
	}
	if (clickchartfloodinc === 'Harrow'){
		dataCO = HarrowCO;
	}
	if (clickchartfloodinc === 'Brent'){
		dataCO = BrentCO;
	}
	if (clickchartfloodinc === 'Barnet'){
		dataCO = BarnetCO;
	}
	if (clickchartfloodinc === 'Lambeth'){
		dataCO = LambethCO;
	}
	if (clickchartfloodinc === 'Southwark'){
		dataCO = SouthwarkCO;
	}
	if (clickchartfloodinc === 'Southwark'){
		dataCO = SouthwarkCO;
	}
	if (clickchartfloodinc === 'Lewisham'){
		dataCO = LewishamCO;
	}
	if (clickchartfloodinc === 'Greenwich'){
		dataCO = GreenwichCO;
	}
	if (clickchartfloodinc === 'Bexley'){
		dataCO = BexleyCO;
	}
	if (clickchartfloodinc === 'Enfield'){
		dataCO = EnfieldCO;
	}
	if (clickchartfloodinc === 'Waltham Forest'){
		dataCO = WalthamForestCO;
	}
	if (clickchartfloodinc === 'Redbridge'){
		dataCO = RedbridgeCO;
	}
	if (clickchartfloodinc === 'Sutton'){
		dataCO = SuttonCO;
	}
	if (clickchartfloodinc === 'Richmond upon Thames'){
		dataCO = RichmonduponThamesCO;
	}
	if (clickchartfloodinc === 'Merton'){
		dataCO = MertonCO;
	}
	if (clickchartfloodinc === 'Wandsworth'){
		dataCO = WandsworthCO;
	}
	if (clickchartfloodinc === 'Hammersmith and Fulham'){
		dataCO = HammersmithandFulhamCO;
	}
	if (clickchartfloodinc === 'Kensington and Chelsea'){
		dataCO = KensingtonandChelseaCO;
	}
	if (clickchartfloodinc === 'Westminster'){
		dataCO = WestminsterCO;
	}
	if (clickchartfloodinc === 'Camden'){
		dataCO = CamdenCO;
	}
	if (clickchartfloodinc === 'Tower Hamlets'){
		dataCO = TowerHamletsCO;
	}
	if (clickchartfloodinc === 'Islington'){
		dataCO = IslingtonCO;
	}
	if (clickchartfloodinc === 'Hackney'){
		dataCO = HackneyCO;
	}
	if (clickchartfloodinc === 'Haringey'){
		dataCO = HaringeyCO;
	}
	if (clickchartfloodinc === 'Newham'){
		dataCO = NewhamCO;
	}
	if (clickchartfloodinc === 'Barking and Dagenham'){
		dataCO = BarkingandDagenhamCO;
	}
	if (clickchartfloodinc === 'City of London'){
		dataCO = CityofLondonCO;
	}
	child = dataCO[1][0];
	old = dataCO[1][1];
	working = dataCO[1][2];
	layoutTable.getCell(0, 1).content(Detailline());
	layoutTable.getCell(1, 1).content(Detailtableone());
	layoutTable.getCell(2, 1).content(Detailtable());
	
}

function Detailline(){
	var data = anychart.data.set(floodincmonth);
	var seriesData_1 = data.mapAs({x: 0, value: 1});
	// create a chart
	chartone = anychart.line();
	// create the first series, set the data and name
	seriesmonth = chartone.line(seriesData_1);
	seriesmonth.name("Flood incident per Months")
	.color('#33ccff');
	
	var title;
	title = chartone.title();
	title.enabled(true);
	title.text("Flood incident per Months");
	title.fontSize(10);
	
	var labelsx = chartone.xAxis().labels();
	labelsx.fontSize(8);
	var labelsy = chartone.yAxis().labels();
	labelsy.fontSize(8);
	
	
	chartone.draw();
	
	return chartone
}
var tableone;
function Detailtableone(){
tableone = anychart.standalones.table(10,3 );
tableone.cellBorder(null);
tableone.getCol(0).width('33.33%');
tableone.getCol(1).width('33.33%');
tableone.getCol(2).width('33.33%');
tableone.getRow(0).height('10%');
tableone.getRow(1).height('10%');
tableone.getRow(2).height('10%');
tableone.getRow(3).height('10%');
tableone.getRow(4).height('10%');
tableone.getRow(5).height('10%');
tableone.getRow(6).height('10%');
tableone.getRow(7).height('10%');
tableone.getRow(8).height('10%');
tableone.getRow(9).height('10%');



tableone.getCell(0, 0).colSpan(3).content('Available Site')
.fontSize(8);
tableone.getCell(1, 1).content('Area of site')
.fontSize(8);
tableone.getCell(2, 1).content('Distance from pipe')
.fontSize(8);
tableone.getCell(3, 1).content('Distance from center')
.fontSize(8);
tableone.getCell(4, 1).content('Area of site')
.fontSize(8);
tableone.getCell(5, 1).content('Distance from pipe')
.fontSize(8);
tableone.getCell(6, 1).content('Distance from center')
.fontSize(8);
tableone.getCell(7, 1).content('Area of site')
.fontSize(8);
tableone.getCell(8, 1).content('Distance from pipe')
.fontSize(8);
tableone.getCell(9, 1).content('Distance from center')
.fontSize(8);
tableone.getCell(1, 2).content(sitea_areasite);
tableone.getCell(2, 2).content(sitea_road);
tableone.getCell(3, 2).content(sitea_center);
tableone.getCell(4, 2).content(siteb_areasite);
tableone.getCell(5, 2).content(siteb_road);
tableone.getCell(6, 2).content(siteb_center);
tableone.getCell(7, 2).content(sitec_areasite);
tableone.getCell(8, 2).content(sitec_road);
tableone.getCell(9, 2).content(sitec_center);
tableone.getCell(1, 0).rowSpan(3).content('Site A')
.fontSize(8);
tableone.getCell(4, 0).rowSpan(3).content('Site B')
.fontSize(8);
tableone.getCell(7, 0).rowSpan(3).content('Site C')
.fontSize(8);

tableone.getRow(0)     
.cellFill("#37474f");
tableone.getRow(1)         
.cellFill("#37474f"); 
tableone.getRow(2)     
.cellFill("#37474f");
tableone.getRow(3)         
.cellFill("#37474f"); 
tableone.getRow(4)     
.cellFill("#37474f");
tableone.getRow(5)         
.cellFill("#37474f");
tableone.getRow(6)     
.cellFill("#37474f");
tableone.getRow(7)         
.cellFill("#37474f");  
tableone.getRow(8)         
.cellFill("#37474f"); 
tableone.getRow(9)         
.cellFill("#37474f"); 

tableone.cellBorder("#b0bec5").hAlign("center").vAlign("middle");
	tableone.cellPadding(0)     
	  .fontWeight(90)   
	  .fontSize(16)           
	  .fontColor('#b0bec5');  

tableone.draw();
return tableone
}

var child;
var old;
var working;

function Detailtable(){
		// create table
	table = anychart.standalones.table(3,3);
	
	 // settings for the first column
	table.getRow(0)
    .height(63.33)           // set column width
    .cellFill("#37474f")  // set column background color
	
	table.getRow(1)
    .height(63.33)           // set column width
    .cellFill("#37474f") 
	
	table.getRow(2)
    .height(63.33)           // set column width
    .cellFill("#37474f") 

	table.getCol(0).width(90);
	table.getCol(1).width(90);
	table.getCol(2).width(95);
	
	table.getCell(0, 0).colSpan(3).content('Children,Old, Working Age per Borough')
	.fontSize(10);
	table.getCell(1, 0).content('Child AGE(%)')
	.fontSize(8);
	table.getCell(1, 1).content('Old AGE(%)')
	.fontSize(8);
	table.getCell(1, 2).content('Working AGE(%)')
	.fontSize(8);
	table.getCell(2, 0).content(child);
	table.getCell(2, 1).content(old);
	table.getCell(2, 2).content(working);
	

	table.cellBorder("#b0bec5").hAlign("center").vAlign("middle");
	table.cellPadding(0)      // set 10px padding from each border of every cell
	  .fontWeight(90)   // set text font weight
	  .fontSize(16)           // set text font size
	  .fontColor('#b0bec5');  // set text font color

	table.draw();
	// add a listener
	// floodtable.listen("pointClick", highlightTable);
	return table
}

//get flood incident per month
var floodincidentlayer;
var floodincidentjson ;
var floodincarray=[];
var floodincmonth=[];
function getfloodIncident(){
	client = new XMLHttpRequest();
	client.open('GET','GeoJSON/flood_incident_month.geojson');
	client.onreadystatechange = floodincidentResponse;
	client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function floodincidentResponse(){
if(client.readyState == 4){
	var floodincidentdata = client.responseText;
	loadfloodIncidentlayer(floodincidentdata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadfloodIncidentlayer(floodincidentdata){
floodincidentjson = JSON.parse(floodincidentdata);

var features = []; 
features = floodincidentjson.features; 
var jproperties = floodincidentjson.features.map(function (el) { return el.properties; });
var i;
for (i = 0; i < jproperties.length; i++) { 
	floodincarray.push(Object.values(jproperties[i]));
}

}

var sitearray = [];
var sitea_areasite; 
var siteb_areasite; 
var sitec_areasite; 
var sitea_road; 
var siteb_road; 
var sitec_road; 
var sitea_center; 
var siteb_center; 
var sitec_center; 
function getSite(){
	clientone = new XMLHttpRequest();
	clientone.open('GET','GeoJSON/Site_Flood.geojson');
	clientone.onreadystatechange = siteResponse;
	clientone.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function siteResponse(){
if(clientone.readyState == 4){
	var sitedata = clientone.responseText;
	loadsitelayer(sitedata);
	}
}
// convert the received data - which is text - to JSON format and add it to the map
function loadsitelayer(sitedata){
sitejson = JSON.parse(sitedata);

var features = []; 
features = sitejson.features; 
var jproperties = sitejson.features.map(function (el) { return el.properties; });
var i;
for (i = 0; i < jproperties.length; i++) { 
	sitearray.push(Object.values(jproperties[i]));
}

}

getSite();