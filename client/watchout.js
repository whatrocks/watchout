// SETUP
var timeout = 2000;
var h = 500;            // svg element height
var w = 500;            // svg width
var circleRadius = 15;  // radius of circles
var heroes = [];        // dataset of the hero(es)
var enemies = [];       // dataset of the enemies

var scoreboard = [
  {name: 'highscore', value: 50},
  {name: 'current', value: 100},
  {name: 'collisions', value: 10}
];


// HELPER FUNCTION
var randomLocation = function(axis) {
  return Math.floor(Math.random() * axis - 5);
};

// CREATE THE ENEMIES
for (var i = 0; i < 10; i++) {
  var enemy = {
    id: i,
    type: "enemy",
    x: randomLocation(w),
    y: randomLocation(h)
  };
  enemies.push(enemy);
}

// CREATE A HERO
var hero = { id: 0, type: "hero", x: w/2, y: h/2};
heroes.push(hero);

// MAIN GAME LOOP
setInterval(function(){
  updateScore();
  collisionDetectionAtRest();
}, 100);


// UPDATE SCORES
var updateScore = function() {
  // increment counter
  scoreboard[1].value++;
  if (scoreboard[1].value > scoreboard[0].value) {
    scoreboard[0].value = scoreboard[1].value;
  }
  // select element
  d3.select('.scoreboard')
  .selectAll('span')
  .data(scoreboard)
  .text(function(d) {return d.value;});
};

// RANDOM ENEMY LOCATION
setInterval(function(){
  // New random location
  for (var enemy = 0; enemy < enemies.length; enemy++ ){
     enemies[enemy].x = randomLocation(w);
     enemies[enemy].y = randomLocation(h);
  }
  updateEnemies();
}, timeout);


// CREATE GAME BOARD
var svg = d3.select("body")
  .append("svg")
  .attr("height", h)
  .attr("width", w)
  .attr("class", "board");

// SHOW THE ENEMIES
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
    .attr("r", circleRadius)
    .attr("class", "enemy");
};

// SHOW THE HERO
var createHero = function() {
  
  svg.selectAll("circle:not(.enemy)")
     .data(heroes)
     .enter()
     .append("circle")
     .attr("cx", function(d){
      return d.x;
     })
     .attr("cy", function(d){
      return d.y;
     })
     .attr("r", circleRadius)
     .attr("class", "hero")
     .call(dragger);
};

var updateEnemies = function() {

  svg.selectAll(".enemy")
    .data(enemies, function(d){
      return d.id;
    })
    .transition()
    .duration(1500)
    .tween('collision-detector', tracker)
    .attr("cx", function(d){
      return d.x;
    })
    .attr("cy", function(d){
      return d.y;
    })
    .attr("r", circleRadius);
};

// Drag listener
var dragger = d3.behavior.drag();

dragger.on('drag', function(){
  d3.select(this).attr('cx', d3.event.x);
  d3.select(this).attr('cy', d3.event.y);

});


// TWEEN
var tracker = function(d,i) {
  // var enemy = this.getAttribute('cx'); 
  // console.log(enemy);
  return function(){
    var enemyX = this.getAttribute('cx');
    var enemyY = this.getAttribute('cy');
    collisionDetectionWhileMoving(enemyX, enemyY);
  };
};

// COLLISION DETECTION
var collisionDetectionWhileMoving = function(enemyX, enemyY) {
  var hero = svg.select('.hero'); // circle 1
  var dx = Math.abs(hero.attr('cx') - enemyX);
  var dy = Math.abs(hero.attr('cy') - enemyY);
  var distance = Math.sqrt( (dx * dx) + (dy * dy) );
  if ( distance < ( circleRadius * 2 )) {
      // console.log("collide while moving!!");
    scoreboard[2].value += 1;
    scoreboard[1].value = 0;
  }
};

var collisionDetectionAtRest = function() {
  var hero = svg.select('.hero'); // circle 1

  for ( var i = 0; i < enemies.length; i++ ){
    var dx = Math.abs(hero.attr('cx') - enemies[i].x);
    var dy = Math.abs(hero.attr('cy') - enemies[i].y);
    var distance = Math.sqrt( (dx * dx) + (dy * dy) );
    if ( distance < ( circleRadius * 2 )) {
      // console.log("collide AT REST!!");
      scoreboard[2].value += 1;
      scoreboard[1].value = 0;
    }
  }
};



// CALL THESE TO START GAME
createEnemies();
createHero();

