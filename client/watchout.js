// start slingin' some d3 here.

// Setup the game
var h = 500;
var w = 500;
var enemies = [];

var randomLocation = function(axis) { // axis is h or w
  return Math.floor(Math.random() * axis - 5);
};

// Initialize enemies
for (var i = 0; i < 10; i++) {
  var enemy = {
    id: i,
    xloc: randomLocation(w),
    yloc: randomLocation(h)
  };
  enemies.push(enemy);
}


// Random location
setInterval(function(){

  for (var enemy = 0; enemy < enemies.length; enemy++ ){
    console.log(enemies[0]);
    enemies[enemy].xloc = randomLocation(w);
    enemies[enemy].yloc = randomLocation(h);
  }
  updateEnemies();
},1000);


// Prevent from offscreen

// CREATE GAME BOARD
var svg = d3.select("body")
  .append("svg")
  .attr("height", h)
  .attr("width", w);


// CREATE ENEMIES
var createEnemies = function() {

  svg.selectAll("circle")
    .data(enemies)
    .enter()
    .append("circle")
    .attr("cx", function(d){
      return d.xloc;
    })
    .attr("cy", function(d){
      return d.yloc;
    })
    .attr("r", 10)
    .attr("class", "enemy");
};

var updateEnemies = function() {

  svg.selectAll("circle")
    .data(enemies, function(d){
      return d.id;
    })
    .transition()
    .duration(750)
    .attr("cx", function(d){
      return d.xloc;
    })
    .attr("cy", function(d){
      return d.yloc;
    })
    .attr("r", 10);

};

createEnemies();
console.log(enemies);
