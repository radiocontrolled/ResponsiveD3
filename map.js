
var viewportWidth = $(window).width();
var viewportHeight = $(window).height()/2;
var width = viewportWidth * .97;
var height = width/1.85;

//Define map projection 
var projection = d3.geo.mercator();
      projection
    	.scale([width/3.5])
   		.translate([width/1,height*1.4]);

//Define path generator
var path = d3.geo.path().projection(projection);
			
 d3.json("canada.json", function(json) {
 	
 	var svg = d3.select("article")
		.append("svg")
		.attr("width",width)
		.attr("height",height);
	//draw map
	var map = svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("fill", "#3498db"); 
 	})


d3.select(window).on('resize', resize);

function resize() {
  
    width = parseInt(d3.select('article').style('width'));
    width = $(window).width() * .97;
    height = width/1.85;
  
   projection
    	.scale([width/3.5])
   		.translate([width/1,height*1.4]);

    
   d3.select("article").attr("width",width).attr("height",height);
   d3.select("svg").attr("width",width).attr("height",height);
  
   d3.selectAll("path").attr('d', path);
 

}
