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
	
		//arrange data for chart two and three
	if (highchart === 'Kingston upon Thames'){
		dataLU = KingstonuponThamesLU;
		dataCO = KingstonuponThamesCO;
	}
	
	if (highchart === 'Croydon'){
		dataLU = CroydonLU;
		dataCO = CroydonCO;
	}
	
	if (highchart === 'Bromley'){
		dataLU = BromleyLU;
		dataCO = BromleyCO;
	}
	
	if (highchart === 'Hounslow'){
		dataLU = HounslowLU;
		dataCO = HounslowCO;
	}
	
	if (highchart === 'Ealing'){
		dataLU = EalingLU;
		dataCO = EalingCO;
	}
	
	if (highchart === 'Havering'){
		dataLU = HaveringLU;
		dataCO = HaveringCO;
	}
	if (highchart === 'Hillingdon'){
		dataLU = HillingdonLU;
		dataCO = HillingdonCO;
	}
	if (highchart === 'Harrow'){
		dataLU = HarrowLU;
		dataCO = HarrowCO;
	}
	if (highchart === 'Brent'){
		dataLU = BrentLU;
		dataCO = BrentCO;
	}
	if (highchart === 'Barnet'){
		dataLU = BarnetLU;
		dataCO = BarnetCO;
	}
	if (highchart === 'Lambeth'){
		dataLU = LambethLU;
		dataCO = LambethCO;
	}
	if (highchart === 'Southwark'){
		dataLU = SouthwarkLU;
		dataCO = SouthwarkCO;
	}
	if (highchart === 'Lewisham'){
		dataLU = LewishamLU;
		dataCO = LewishamCO;
	}
	if (highchart === 'Greenwich'){
		dataLU = GreenwichLU;
		dataCO = GreenwichCO;
	}
	if (highchart === 'Bexley'){
		dataLU = BexleyLU;
		dataCO = BexleyCO;
	}
	if (highchart === 'Enfield'){
		dataLU = EnfieldLU;
		dataCO = EnfieldCO;
	}
	if (highchart === 'Waltham Forest'){
		dataLU = WalthamForestLU;
		dataCO = WalthamForestCO;
	}
	if (highchart === 'Redbridge'){
		dataLU = RedbridgeLU;
		dataCO = RedbridgeCO;
	}
	if (highchart === 'Sutton'){
		dataLU = SuttonLU;
		dataCO = SuttonCO;
	}
	if (highchart === 'Richmond upon Thames'){
		dataLU = RichmonduponThamesLU;
		dataCO = RichmonduponThamesCO;
	}
	if (highchart === 'Merton'){
		dataLU = MertonLU;
		dataCO = MertonCO;
	}
	if (highchart === 'Wandsworth'){
		dataLU = WandsworthLU;
		dataCO = WandsworthCO;
	}
	if (highchart === 'Hammersmith and Fulham'){
		dataLU = HammersmithandFulhamLU;
		dataCO = HammersmithandFulhamCO;
	}
	if (highchart === 'Kensington and Chelsea'){
		dataLU = KensingtonandChelseaLU;
		dataCO = KensingtonandChelseaCO;
	}
	if (highchart === 'Westminster'){
		dataLU = WestminsterLU;
		dataCO = WestminsterCO;
	}
	if (highchart === 'Camden'){
		dataLU = CamdenLU;
		dataCO = CamdenCO;
	}
	if (highchart === 'Tower Hamlets'){
		dataLU = TowerHamletsLU;
		dataCO = TowerHamletsCO;
	}
	if (highchart === 'Islington'){
		dataLU = IslingtonLU;
		dataCO = IslingtonCO;
	}
	if (highchart === 'Hackney'){
		dataLU = HackneyLU;
		dataCO = HackneyCO;
	}
	if (highchart === 'Haringey'){
		dataLU = HaringeyLU;
		dataCO = HaringeyCO;
	}
	if (highchart === 'Newham'){
		dataLU = NewhamLU;
		dataCO = NewhamCO;
	}
	if (highchart === 'Barking and Dagenham'){
		dataLU = BarkingandDagenhamLU;
		dataCO = BarkingandDagenhamCO;
	}
	if (highchart === 'City of London'){
		dataLU = CityofLondonLU;
		dataCO = CityofLondonCO;
	}
		
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

//variable for landuse and child old
var KingstonuponThamesLU = [];
var CroydonLU = [];
var BromleyLU = [];
var HounslowLU = [];
var EalingLU = [];
var HaveringLU=[];
var HillingdonLU=[];
var HarrowLU=[];
var BrentLU=[];
var BarnetLU =[];
var LambethLU = [];
var SouthwarkLU =[];
var LewishamLU=[];
var GreenwichLU=[];
var BexleyLU=[];
var EnfieldLU=[];
var WalthamForestLU=[];
var RedbridgeLU=[];
var SuttonLU=[];
var RichmonduponThamesLU=[];
var MertonLU=[];
var WandsworthLU=[];
var HammersmithandFulhamLU=[];
var KensingtonandChelseaLU=[];
var WestminsterLU=[];
var CamdenLU=[];
var TowerHamletsLU=[];
var IslingtonLU=[];
var HackneyLU=[];
var HaringeyLU=[];
var NewhamLU=[];
var BarkingandDagenhamLU=[];
var CityofLondonLU=[];
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

//layout landuse data
KingstonuponThamesLU.push(["Domestic Buildings",boroughfloodincarray[0][6]],["Domestic Gardens",boroughfloodincarray[0][7]],["Non Domestic Buildings",boroughfloodincarray[0][8]],["Road",boroughfloodincarray[0][9]],["Rail",boroughfloodincarray[0][10]],["Path",boroughfloodincarray[0][11]],["Greenspace",boroughfloodincarray[0][12]],["Water",boroughfloodincarray[0][13]],["Other Land Uses",boroughfloodincarray[0][14]]);
CroydonLU.push(["Domestic Buildings",boroughfloodincarray[1][6]],["Domestic Gardens",boroughfloodincarray[1][7]],["Non Domestic Buildings",boroughfloodincarray[1][8]],["Road",boroughfloodincarray[1][9]],["Rail",boroughfloodincarray[1][10]],["Path",boroughfloodincarray[1][11]],["Greenspace",boroughfloodincarray[1][12]],["Water",boroughfloodincarray[1][13]],["Other Land Uses",boroughfloodincarray[1][14]]);
BromleyLU.push(["Domestic Buildings",boroughfloodincarray[2][6]],["Domestic Gardens",boroughfloodincarray[2][7]],["Non Domestic Buildings",boroughfloodincarray[2][8]],["Road",boroughfloodincarray[2][9]],["Rail",boroughfloodincarray[2][10]],["Path",boroughfloodincarray[2][11]],["Greenspace",boroughfloodincarray[2][12]],["Water",boroughfloodincarray[2][13]],["Other Land Uses",boroughfloodincarray[2][14]]);
HounslowLU.push(["Domestic Buildings",boroughfloodincarray[3][6]],["Domestic Gardens",boroughfloodincarray[3][7]],["Non Domestic Buildings",boroughfloodincarray[3][8]],["Road",boroughfloodincarray[3][9]],["Rail",boroughfloodincarray[3][10]],["Path",boroughfloodincarray[3][11]],["Greenspace",boroughfloodincarray[3][12]],["Water",boroughfloodincarray[3][13]],["Other Land Uses",boroughfloodincarray[3][14]]);
EalingLU.push(["Domestic Buildings",boroughfloodincarray[4][6]],["Domestic Gardens",boroughfloodincarray[4][7]],["Non Domestic Buildings",boroughfloodincarray[4][8]],["Road",boroughfloodincarray[4][9]],["Rail",boroughfloodincarray[4][10]],["Path",boroughfloodincarray[4][11]],["Greenspace",boroughfloodincarray[4][12]],["Water",boroughfloodincarray[4][13]],["Other Land Uses",boroughfloodincarray[4][14]]);
HaveringLU.push(["Domestic Buildings",boroughfloodincarray[5][6]],["Domestic Gardens",boroughfloodincarray[5][7]],["Non Domestic Buildings",boroughfloodincarray[5][8]],["Road",boroughfloodincarray[5][9]],["Rail",boroughfloodincarray[5][10]],["Path",boroughfloodincarray[5][11]],["Greenspace",boroughfloodincarray[5][12]],["Water",boroughfloodincarray[5][13]],["Other Land Uses",boroughfloodincarray[5][14]]);
HillingdonLU.push(["Domestic Buildings",boroughfloodincarray[6][6]],["Domestic Gardens",boroughfloodincarray[6][7]],["Non Domestic Buildings",boroughfloodincarray[6][8]],["Road",boroughfloodincarray[6][9]],["Rail",boroughfloodincarray[6][10]],["Path",boroughfloodincarray[6][11]],["Greenspace",boroughfloodincarray[6][12]],["Water",boroughfloodincarray[6][13]],["Other Land Uses",boroughfloodincarray[6][14]]);
HarrowLU.push(["Domestic Buildings",boroughfloodincarray[7][6]],["Domestic Gardens",boroughfloodincarray[7][7]],["Non Domestic Buildings",boroughfloodincarray[7][8]],["Road",boroughfloodincarray[7][9]],["Rail",boroughfloodincarray[7][10]],["Path",boroughfloodincarray[7][11]],["Greenspace",boroughfloodincarray[7][12]],["Water",boroughfloodincarray[7][13]],["Other Land Uses",boroughfloodincarray[7][14]]);
BrentLU.push(["Domestic Buildings",boroughfloodincarray[8][6]],["Domestic Gardens",boroughfloodincarray[8][7]],["Non Domestic Buildings",boroughfloodincarray[8][8]],["Road",boroughfloodincarray[8][9]],["Rail",boroughfloodincarray[8][10]],["Path",boroughfloodincarray[8][11]],["Greenspace",boroughfloodincarray[8][12]],["Water",boroughfloodincarray[8][13]],["Other Land Uses",boroughfloodincarray[8][14]]);
BarnetLU.push(["Domestic Buildings",boroughfloodincarray[9][6]],["Domestic Gardens",boroughfloodincarray[9][7]],["Non Domestic Buildings",boroughfloodincarray[9][8]],["Road",boroughfloodincarray[9][9]],["Rail",boroughfloodincarray[9][10]],["Path",boroughfloodincarray[9][11]],["Greenspace",boroughfloodincarray[9][12]],["Water",boroughfloodincarray[9][13]],["Other Land Uses",boroughfloodincarray[9][14]]);
LambethLU.push(["Domestic Buildings",boroughfloodincarray[9][6]],["Domestic Gardens",boroughfloodincarray[10][7]],["Non Domestic Buildings",boroughfloodincarray[10][8]],["Road",boroughfloodincarray[10][9]],["Rail",boroughfloodincarray[10][10]],["Path",boroughfloodincarray[10][11]],["Greenspace",boroughfloodincarray[10][12]],["Water",boroughfloodincarray[10][13]],["Other Land Uses",boroughfloodincarray[10][14]]);
SouthwarkLU.push(["Domestic Buildings",boroughfloodincarray[11][6]],["Domestic Gardens",boroughfloodincarray[11][7]],["Non Domestic Buildings",boroughfloodincarray[11][8]],["Road",boroughfloodincarray[11][9]],["Rail",boroughfloodincarray[11][10]],["Path",boroughfloodincarray[11][11]],["Greenspace",boroughfloodincarray[11][12]],["Water",boroughfloodincarray[11][13]],["Other Land Uses",boroughfloodincarray[11][14]]);
LewishamLU.push(["Domestic Buildings",boroughfloodincarray[12][6]],["Domestic Gardens",boroughfloodincarray[12][7]],["Non Domestic Buildings",boroughfloodincarray[12][8]],["Road",boroughfloodincarray[12][9]],["Rail",boroughfloodincarray[12][10]],["Path",boroughfloodincarray[12][11]],["Greenspace",boroughfloodincarray[12][12]],["Water",boroughfloodincarray[12][13]],["Other Land Uses",boroughfloodincarray[12][14]]);
GreenwichLU.push(["Domestic Buildings",boroughfloodincarray[13][6]],["Domestic Gardens",boroughfloodincarray[13][7]],["Non Domestic Buildings",boroughfloodincarray[13][8]],["Road",boroughfloodincarray[13][9]],["Rail",boroughfloodincarray[13][10]],["Path",boroughfloodincarray[13][11]],["Greenspace",boroughfloodincarray[13][12]],["Water",boroughfloodincarray[13][13]],["Other Land Uses",boroughfloodincarray[13][14]]);
BexleyLU.push(["Domestic Buildings",boroughfloodincarray[14][6]],["Domestic Gardens",boroughfloodincarray[14][7]],["Non Domestic Buildings",boroughfloodincarray[14][8]],["Road",boroughfloodincarray[14][9]],["Rail",boroughfloodincarray[14][10]],["Path",boroughfloodincarray[14][11]],["Greenspace",boroughfloodincarray[14][12]],["Water",boroughfloodincarray[14][13]],["Other Land Uses",boroughfloodincarray[14][14]]);
EnfieldLU.push(["Domestic Buildings",boroughfloodincarray[15][6]],["Domestic Gardens",boroughfloodincarray[15][7]],["Non Domestic Buildings",boroughfloodincarray[15][8]],["Road",boroughfloodincarray[15][9]],["Rail",boroughfloodincarray[15][10]],["Path",boroughfloodincarray[15][11]],["Greenspace",boroughfloodincarray[15][12]],["Water",boroughfloodincarray[15][13]],["Other Land Uses",boroughfloodincarray[15][14]]);
WalthamForestLU.push(["Domestic Buildings",boroughfloodincarray[16][6]],["Domestic Gardens",boroughfloodincarray[16][7]],["Non Domestic Buildings",boroughfloodincarray[16][8]],["Road",boroughfloodincarray[16][9]],["Rail",boroughfloodincarray[16][10]],["Path",boroughfloodincarray[16][11]],["Greenspace",boroughfloodincarray[16][12]],["Water",boroughfloodincarray[16][13]],["Other Land Uses",boroughfloodincarray[16][14]]);
RedbridgeLU.push(["Domestic Buildings",boroughfloodincarray[17][6]],["Domestic Gardens",boroughfloodincarray[17][7]],["Non Domestic Buildings",boroughfloodincarray[17][8]],["Road",boroughfloodincarray[17][9]],["Rail",boroughfloodincarray[17][10]],["Path",boroughfloodincarray[17][11]],["Greenspace",boroughfloodincarray[17][12]],["Water",boroughfloodincarray[17][13]],["Other Land Uses",boroughfloodincarray[17][14]]);
SuttonLU.push(["Domestic Buildings",boroughfloodincarray[18][6]],["Domestic Gardens",boroughfloodincarray[18][7]],["Non Domestic Buildings",boroughfloodincarray[18][8]],["Road",boroughfloodincarray[18][9]],["Rail",boroughfloodincarray[18][10]],["Path",boroughfloodincarray[18][11]],["Greenspace",boroughfloodincarray[18][12]],["Water",boroughfloodincarray[18][13]],["Other Land Uses",boroughfloodincarray[18][14]]);
RichmonduponThamesLU.push(["Domestic Buildings",boroughfloodincarray[19][6]],["Domestic Gardens",boroughfloodincarray[19][7]],["Non Domestic Buildings",boroughfloodincarray[19][8]],["Road",boroughfloodincarray[19][9]],["Rail",boroughfloodincarray[19][10]],["Path",boroughfloodincarray[19][11]],["Greenspace",boroughfloodincarray[19][12]],["Water",boroughfloodincarray[19][13]],["Other Land Uses",boroughfloodincarray[19][14]]);
MertonLU.push(["Domestic Buildings",boroughfloodincarray[20][6]],["Domestic Gardens",boroughfloodincarray[20][7]],["Non Domestic Buildings",boroughfloodincarray[20][8]],["Road",boroughfloodincarray[20][9]],["Rail",boroughfloodincarray[20][10]],["Path",boroughfloodincarray[20][11]],["Greenspace",boroughfloodincarray[20][12]],["Water",boroughfloodincarray[20][13]],["Other Land Uses",boroughfloodincarray[20][14]]);
WandsworthLU.push(["Domestic Buildings",boroughfloodincarray[21][6]],["Domestic Gardens",boroughfloodincarray[21][7]],["Non Domestic Buildings",boroughfloodincarray[21][8]],["Road",boroughfloodincarray[21][9]],["Rail",boroughfloodincarray[21][10]],["Path",boroughfloodincarray[21][11]],["Greenspace",boroughfloodincarray[21][12]],["Water",boroughfloodincarray[21][13]],["Other Land Uses",boroughfloodincarray[21][14]]);
HammersmithandFulhamLU.push(["Domestic Buildings",boroughfloodincarray[22][6]],["Domestic Gardens",boroughfloodincarray[22][7]],["Non Domestic Buildings",boroughfloodincarray[22][8]],["Road",boroughfloodincarray[22][9]],["Rail",boroughfloodincarray[22][10]],["Path",boroughfloodincarray[22][11]],["Greenspace",boroughfloodincarray[22][12]],["Water",boroughfloodincarray[22][13]],["Other Land Uses",boroughfloodincarray[22][14]]);
KensingtonandChelseaLU.push(["Domestic Buildings",boroughfloodincarray[23][6]],["Domestic Gardens",boroughfloodincarray[23][7]],["Non Domestic Buildings",boroughfloodincarray[23][8]],["Road",boroughfloodincarray[23][9]],["Rail",boroughfloodincarray[23][10]],["Path",boroughfloodincarray[23][11]],["Greenspace",boroughfloodincarray[23][12]],["Water",boroughfloodincarray[23][13]],["Other Land Uses",boroughfloodincarray[23][14]]);
WestminsterLU.push(["Domestic Buildings",boroughfloodincarray[24][6]],["Domestic Gardens",boroughfloodincarray[24][7]],["Non Domestic Buildings",boroughfloodincarray[24][8]],["Road",boroughfloodincarray[24][9]],["Rail",boroughfloodincarray[24][10]],["Path",boroughfloodincarray[24][11]],["Greenspace",boroughfloodincarray[24][12]],["Water",boroughfloodincarray[24][13]],["Other Land Uses",boroughfloodincarray[24][14]]);
CamdenLU.push(["Domestic Buildings",boroughfloodincarray[25][6]],["Domestic Gardens",boroughfloodincarray[25][7]],["Non Domestic Buildings",boroughfloodincarray[25][8]],["Road",boroughfloodincarray[25][9]],["Rail",boroughfloodincarray[25][10]],["Path",boroughfloodincarray[25][11]],["Greenspace",boroughfloodincarray[25][12]],["Water",boroughfloodincarray[25][13]],["Other Land Uses",boroughfloodincarray[25][14]]);
TowerHamletsLU.push(["Domestic Buildings",boroughfloodincarray[26][6]],["Domestic Gardens",boroughfloodincarray[26][7]],["Non Domestic Buildings",boroughfloodincarray[26][8]],["Road",boroughfloodincarray[26][9]],["Rail",boroughfloodincarray[26][10]],["Path",boroughfloodincarray[26][11]],["Greenspace",boroughfloodincarray[26][12]],["Water",boroughfloodincarray[26][13]],["Other Land Uses",boroughfloodincarray[26][14]]);
IslingtonLU.push(["Domestic Buildings",boroughfloodincarray[27][6]],["Domestic Gardens",boroughfloodincarray[27][7]],["Non Domestic Buildings",boroughfloodincarray[27][8]],["Road",boroughfloodincarray[27][9]],["Rail",boroughfloodincarray[27][10]],["Path",boroughfloodincarray[27][11]],["Greenspace",boroughfloodincarray[27][12]],["Water",boroughfloodincarray[27][13]],["Other Land Uses",boroughfloodincarray[27][14]]);
HackneyLU.push(["Domestic Buildings",boroughfloodincarray[28][6]],["Domestic Gardens",boroughfloodincarray[28][7]],["Non Domestic Buildings",boroughfloodincarray[28][8]],["Road",boroughfloodincarray[28][9]],["Rail",boroughfloodincarray[28][10]],["Path",boroughfloodincarray[28][11]],["Greenspace",boroughfloodincarray[28][12]],["Water",boroughfloodincarray[28][13]],["Other Land Uses",boroughfloodincarray[28][14]]);
HaringeyLU.push(["Domestic Buildings",boroughfloodincarray[29][6]],["Domestic Gardens",boroughfloodincarray[29][7]],["Non Domestic Buildings",boroughfloodincarray[29][8]],["Road",boroughfloodincarray[29][9]],["Rail",boroughfloodincarray[29][10]],["Path",boroughfloodincarray[29][11]],["Greenspace",boroughfloodincarray[29][12]],["Water",boroughfloodincarray[29][13]],["Other Land Uses",boroughfloodincarray[29][14]]);
NewhamLU.push(["Domestic Buildings",boroughfloodincarray[30][6]],["Domestic Gardens",boroughfloodincarray[30][7]],["Non Domestic Buildings",boroughfloodincarray[30][8]],["Road",boroughfloodincarray[30][9]],["Rail",boroughfloodincarray[30][10]],["Path",boroughfloodincarray[30][11]],["Greenspace",boroughfloodincarray[30][12]],["Water",boroughfloodincarray[30][13]],["Other Land Uses",boroughfloodincarray[30][14]]);
BarkingandDagenhamLU.push(["Domestic Buildings",boroughfloodincarray[31][6]],["Domestic Gardens",boroughfloodincarray[31][7]],["Non Domestic Buildings",boroughfloodincarray[31][8]],["Road",boroughfloodincarray[31][9]],["Rail",boroughfloodincarray[31][10]],["Path",boroughfloodincarray[31][11]],["Greenspace",boroughfloodincarray[31][12]],["Water",boroughfloodincarray[31][13]],["Other Land Uses",boroughfloodincarray[31][14]]);
CityofLondonLU.push(["Domestic Buildings",boroughfloodincarray[32][6]],["Domestic Gardens",boroughfloodincarray[32][7]],["Non Domestic Buildings",boroughfloodincarray[32][8]],["Road",boroughfloodincarray[32][9]],["Rail",boroughfloodincarray[32][10]],["Path",boroughfloodincarray[32][11]],["Greenspace",boroughfloodincarray[32][12]],["Water",boroughfloodincarray[32][13]],["Other Land Uses",boroughfloodincarray[32][14]]);

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
layoutTable.getCell(1, 1).content(Detailstick());
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
	
	//arrange data for chart two and three
	if (clickchartfloodinc === 'Kingston upon Thames'){
		dataLU = KingstonuponThamesLU;
		dataCO = KingstonuponThamesCO;
	}
	
	if (clickchartfloodinc === 'Croydon'){
		dataLU = CroydonLU;
		dataCO = CroydonCO;
	}
	
	if (clickchartfloodinc === 'Bromley'){
		dataLU = BromleyLU;
		dataCO = BromleyCO;
	}
	if (clickchartfloodinc === 'Hounslow'){
		dataLU = HounslowLU;
		dataCO = HounslowCO;
	}
	
	if (clickchartfloodinc === 'Ealing'){
		dataLU = EalingLU;
		dataCO = EalingCO;
	}
	
	if (clickchartfloodinc === 'Havering'){
		dataLU = HaveringLU;
		dataCO = HaveringCO;
	}
	
	if (clickchartfloodinc === 'Hillingdon'){
		dataLU = HillingdonLU;
		dataCO = HillingdonCO;
	}
	if (clickchartfloodinc === 'Harrow'){
		dataLU = HarrowLU;
		dataCO = HarrowCO;
	}
	if (clickchartfloodinc === 'Brent'){
		dataLU = BrentLU;
		dataCO = BrentCO;
	}
	if (clickchartfloodinc === 'Barnet'){
		dataLU = BarnetLU;
		dataCO = BarnetCO;
	}
	if (clickchartfloodinc === 'Lambeth'){
		dataLU = LambethLU;
		dataCO = LambethCO;
	}
	if (clickchartfloodinc === 'Southwark'){
		dataLU = SouthwarkLU;
		dataCO = SouthwarkCO;
	}
	if (clickchartfloodinc === 'Southwark'){
		dataLU = SouthwarkLU;
		dataCO = SouthwarkCO;
	}
	if (clickchartfloodinc === 'Lewisham'){
		dataLU = LewishamLU;
		dataCO = LewishamCO;
	}
	if (clickchartfloodinc === 'Greenwich'){
		dataLU = GreenwichLU;
		dataCO = GreenwichCO;
	}
	if (clickchartfloodinc === 'Bexley'){
		dataLU = BexleyLU;
		dataCO = BexleyCO;
	}
	if (clickchartfloodinc === 'Enfield'){
		dataLU = EnfieldLU;
		dataCO = EnfieldCO;
	}
	if (clickchartfloodinc === 'Waltham Forest'){
		dataLU = WalthamForestLU;
		dataCO = WalthamForestCO;
	}
	if (clickchartfloodinc === 'Redbridge'){
		dataLU = RedbridgeLU;
		dataCO = RedbridgeCO;
	}
	if (clickchartfloodinc === 'Sutton'){
		dataLU = SuttonLU;
		dataCO = SuttonCO;
	}
	if (clickchartfloodinc === 'Richmond upon Thames'){
		dataLU = RichmonduponThamesLU;
		dataCO = RichmonduponThamesCO;
	}
	if (clickchartfloodinc === 'Merton'){
		dataLU = MertonLU;
		dataCO = MertonCO;
	}
	if (clickchartfloodinc === 'Wandsworth'){
		dataLU = WandsworthLU;
		dataCO = WandsworthCO;
	}
	if (clickchartfloodinc === 'Hammersmith and Fulham'){
		dataLU = HammersmithandFulhamLU;
		dataCO = HammersmithandFulhamCO;
	}
	if (clickchartfloodinc === 'Kensington and Chelsea'){
		dataLU = KensingtonandChelseaLU;
		dataCO = KensingtonandChelseaCO;
	}
	if (clickchartfloodinc === 'Westminster'){
		dataLU = WestminsterLU;
		dataCO = WestminsterCO;
	}
	if (clickchartfloodinc === 'Camden'){
		dataLU = CamdenLU;
		dataCO = CamdenCO;
	}
	if (clickchartfloodinc === 'Tower Hamlets'){
		dataLU = TowerHamletsLU;
		dataCO = TowerHamletsCO;
	}
	if (clickchartfloodinc === 'Islington'){
		dataLU = IslingtonLU;
		dataCO = IslingtonCO;
	}
	if (clickchartfloodinc === 'Hackney'){
		dataLU = HackneyLU;
		dataCO = HackneyCO;
	}
	if (clickchartfloodinc === 'Haringey'){
		dataLU = HaringeyLU;
		dataCO = HaringeyCO;
	}
	if (clickchartfloodinc === 'Newham'){
		dataLU = NewhamLU;
		dataCO = NewhamCO;
	}
	if (clickchartfloodinc === 'Barking and Dagenham'){
		dataLU = BarkingandDagenhamLU;
		dataCO = BarkingandDagenhamCO;
	}
	if (clickchartfloodinc === 'City of London'){
		dataLU = CityofLondonLU;
		dataCO = CityofLondonCO;
	}
	
	layoutTable.getCell(0, 1).content(Detailline());
	layoutTable.getCell(1, 1).content(Detailstick());
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

function Detailstick(){
	// create a chart
charttwo = anychart.column();

// create an area series and set the data
var series = charttwo.stick(dataLU);

series.name("Land Use")
.color('#c68c53');

var title;
title = charttwo.title();
title.enabled(true);
title.text("Land Use Per Borough");
title.fontSize(10);

// create extra axis on the right side of chart
var yTitle = charttwo.yAxis().title();
yTitle.enabled(true);
yTitle.text('Land Use Area (%)');
yTitle.fontSize(10);

var labelsx = charttwo.xAxis().labels();
labelsx.fontSize(8);
var labelsy = charttwo.yAxis().labels();
labelsy.fontSize(8);


charttwo.draw();

return charttwo
}

function Detailtable(){
	var rawData = dataCO;
		// create table
	table = anychart.standalones.table(2,3);
	table.contents(rawData);
	 // settings for the first column
	table.getRow(0)
    .height(95)           // set column width
    .cellFill("#37474f")  // set column background color
	
	table.getRow(1)
    .height(95)           // set column width
    .cellFill("#37474f") 
  
	table.getCol(0).width(90);
	table.getCol(1).width(90);
	table.getCol(2).width(95);
	
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