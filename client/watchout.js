// start slingin' some d3 here.

// SETUP
var h = 500;
var w = 500;
var enemies = [];
var heroes = [];

// HELPER FUNCTION
var randomLocation = function(axis) { // axis is h or w
  return Math.floor(Math.random() * axis - 5);
};

// INITIALIZE THE ENEMIES
for (var i = 0; i < 10; i++) {
  var enemy = {
    id: i,
    x: randomLocation(w),
    y: randomLocation(h)
  };
  enemies.push(enemy);
}

// INITIALIZE THE HERO
var hero = { id: 0, 
           x: w/2, 
           y: h/2
           };

heroes.push(hero);

// RANDOM ENEMY LOCATION
setInterval(function(){

  for (var enemy = 0; enemy < enemies.length; enemy++ ){
    enemies[enemy].x = randomLocation(w);
    enemies[enemy].y = randomLocation(h);
  }
  updateEnemies();
},1000);

// TODO: Prevent enemies from moving offscreen

// CREATE GAME BOARD
var svg = d3.select("body")
  .append("svg")
  .attr("height", h)
  .attr("width", w)
  .attr("class", "board");

// CREATE ENEMIES
var createEnemies = function() {

  svg.selectAll("circle")
    .data(enemies)
    .enter()
    .append("circle")
    .attr("cx", function(d){
      return d.x;
    })
    .attr("cy", function(d){
      return d.y;
    })
    .attr("r", 10)
    .attr("class", "enemy");
};

// CREATE HERO
var createHero = function() {

  svg.selectAll("circle")
     .data(heroes)
     .enter()
     .append("circle")
     .attr("cx", function(d){
      return d.x;
     })
     .attr("cy", function(d){
      return d.y;
     })
     .attr("r", 5)
     .attr("class", "hero")
     .call(drag);
};

var updateEnemies = function() {

  svg.selectAll(".enemy")
    .data(enemies, function(d){
      return d.id;
    })
    .transition()
    .duration(750)
    .attr("cx", function(d){
      return d.x;
    })
    .attr("cy", function(d){
      return d.y;
    })
    .attr("r", 10);
};

// Drag listener
var drag = d3.behavior.drag();

drag.on('drag', function(){
  d3.select(this).attr('cx', d3.event.x);
  d3.select(this).attr('cy', d3.event.y);
});


// CALL THESE TO START GAME
createHero();
createEnemies();
