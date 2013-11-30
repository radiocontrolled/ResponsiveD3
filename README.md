I tested this in Chrome, Firefox and Safari in a MAMP local hosting environment so I could load index.html over HTTP. 
Cross origin requests (e.g. used in d3.json) require HTTP - you'll get a XMLHttpRequest error in Chrome 
and Safari if you don't load over HTTP. 

Visible Data's <a href="http://eyeseast.github.io/visible-data/2013/08/26/responsive-d3/">Responsive Map</a> was the initial inspiration
but I changes, like jQuery to detect the window size, simplifying resize(), and forgoing Bootstrap by doing my own media queries and tooltip.   
