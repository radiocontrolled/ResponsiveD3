/*http://geoexamples.blogspot.co.uk/2013/02/mapping-with-d3js-canvas-or-svg.html*/
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
d3.csv("migrants_by_region.csv", function(data) {
 d3.json("canada.json", function(json) {

 	var svg = d3.select("article")
		.append("svg")
		.attr("width",width)
		.attr("height",height);
				
							
				
	    //loop through the CSV
		for (var i = 0; i < data.length; i ++){
						
		//get the province/region name
		var provinceName = data[i].iso_3166_2;
						
		//get the number of migrants in that province/region
		var numberOfMigrants = data[i].migrants;
						
		for(var j = 0; j < json.features.length; j++){
							
			if (json.features[j].properties.iso_3166_2 == provinceName){
								
				//make an entry into the JSON with the value of the # of migrants
				json.features[j].properties.value = numberOfMigrants;

				//stop
				break;
			}	
						
	//draw map
	var map = svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("fill", "#3498db")
			.on("mouseover",function(d,i){	
					//grab the coordinates of the mouseover				
					var coordinates = d3.mouse(this);

					d3.select(this).classed("highlight",true)
					d3.select("#tooltip")
					.style({
							"left": coordinates[0] - 100 + "px",
							"top": coordinates[1] + "px"
						})
						.classed("hidden",false)
						.select("#migrants")
						
						.append("text")
						.classed("hidden",false)
						.text(function(){
							return d.properties.name + ", " + d.properties.value;
						})
				    })
			.on("mouseout", function(d,i){
					
				    d3.select(this).classed("highlight",false)	
				    d3.select("#tooltip")
				         .classed("hidden",true)	
				    d3.select("#migrants text").remove();
				})
				         
			}			
		 }		
 	})
});


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
