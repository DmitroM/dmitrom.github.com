var maps = [
  // 1 = Red block
  // 2 = Green block
  [[0, 0, 0, 0, 0], // FLOOR 0
   [0, 0, 0, 0, 0], 
   [0, 0, 0, 0, 0], 
   [0, 0, 0, 0, 0], 
   [0, 0, 0, 0, 2]],
  
  [[2, 1, 0, 0, 0], // FLOOR 1
   [0, 1, 0, 1, 0], 
   [0, 0, 0, 1, 0], 
   [1, 1, 1, 1, 0], 
   [1, 1, 1, 1, 0]],
  
  [[0, 1, 0, 0, 0], // FLOOR 2
   [0, 1, 0, 1, 0], 
   [0, 1, 0, 1, 0], 
   [0, 1, 0, 1, 0], 
   [0, 0, 0, 1, 2]],
  
  [[0, 0, 0, 1, 1], // FLOOR 3
   [0, 1, 0, 1, 1], 
   [0, 1, 0, 1, 1], 
   [0, 1, 0, 0, 0], 
   [2, 1, 1, 1, 0]],
  
  [[0, 0, 0, 0, 0], // FLOOR 4
   [0, 1, 1, 1, 0], 
   [0, 1, 2, 1, 0], 
   [0, 1, 0, 1, 0], 
   [0, 1, 0, 0, 0]],
  
  [[2, 0, 0, 0, 0], // FLOOR 5
   [1, 1, 1, 1, 0], 
   [0, 0, 0, 1, 0], 
   [0, 1, 1, 1, 0], 
   [0, 0, 0, 0, 0]],
  
  [[0, 1, 0, 0, 2], // FLOOR 6
   [0, 1, 0, 1, 1], 
   [0, 1, 0, 0, 0], 
   [0, 1, 1, 1, 0], 
   [0, 0, 0, 0, 0]],
  
  [[1, 1, 1, 1, 0], // FLOOR 7
   [0, 0, 0, 1, 0], 
   [0, 1, 0, 1, 0], 
   [0, 1, 0, 1, 0], 
   [2, 1, 0, 0, 0]],
  
  [[1, 1, 0, 0, 2], // FLOOR 8
   [1, 0, 0, 1, 0], 
   [0, 0, 1, 0, 0], 
   [0, 1, 0, 0, 1], 
   [0, 0, 0, 1, 1]],
  
  [[1, 1, 1, 1, 0], // FLOOR 9
   [0, 0, 0, 1, 0], 
   [0, 1, 2, 1, 0], 
   [0, 1, 1, 1, 0], 
   [0, 0, 0, 0, 0]] 
];

$('#gamemusic')[0].play();

var cube = $('#cube'), /* <ul id="cube"> ... </ul> */
    world = $('#world'), /* <div id="world"> ... </div> */
    result = $('#result'), /* <div id="result"> ... </div> */
    stats = $('#stats'), /* <div id="stats"> ... </div> */
    floors = $('#floors'), /* <div id="floors"> ... </div> */
    x = 0, /* X CORDINATES */
    y = 0; /* Y CORDINATE */
    z = 0, /* Z CORDINATES */
    moves = 0,
    goal = 0;


(function (){
  var mapHTML = '';
  
  var mapAction = [
    0,
    function (){ return "floordown";},
    function (){ return "floorup";}
  ];
  
  maps.forEach(function(map, i){
    var floor = 'floor' + i;
    mapHTML += '<li class="floor '+floor+'">';
      map.forEach(function(row, x){
        row.forEach(function ( action, y ){
          if ( action > 0 ){
            mapHTML += '<div class="' + mapAction[action]() + ' x' + x + 'y' + y + '"></div>';
          }
        });
      });
    mapHTML += '</li>';
  });
  // Last floor
  mapHTML += '<li class="floor floor'+(maps.length)+' floor-gameover"><li>';
  
  floors.html(mapHTML);
})(); // Render Maps

$('body').keydown(function (e) { /* On keydown */
  
  if (e.keyCode == 40) { //CHECK KEYCODE IF DOWN ARROW
    if (x !== 4) {
      moves++;
      x++;
    }
  } else if (e.keyCode == 39) { //CHECK KEYCODE IF UP ARROW
    if (y !== 4) {  
      moves++;
      y++;
    }
  } else if (e.keyCode == 38) { //CHECK KEYCODE IF RIGHT ARROW
    if (x !== 0) {
      moves++;
      x--;
    }  
  } else if (e.keyCode == 37) { //CHECK KEYCODE IF LEFT ARROW
    if (y !== 0) {
      moves++;
      y--;
    }
  }

  var actions = [
    0, // NO ACTION
    function (){ // Go Down
      z--;
      $('#floordown')[0].play();
    },  
    function (){    // Go up
      z++;
      $('#floorup')[0].play();
    }  
  ]
  
  var action = maps[z][x][y];
  
  if ( action > 0) {
    actions[action]();
  }
  
  /* HIDE THE ABOVE FLOORS */
  var floor = $('.floor' + z + '');
  if ( z >= z ) { floor.css({ "opacity": "1" }); }
  $('.floor' + (z+1) + '').css({ "opacity": "0" });
  /* END HIDE ABOVE FLOORS */
  
  /* BASIC WORLD FLOATING DEPENDING ON WHICH FLOOR */
  world.css({
    "-webkit-transform": "rotateX(45deg) rotate(0deg) translateZ(" + (z * -100 - 300) + "px)" 
  });
  result.css({
    "-webkit-transform": "translateY(-625px) translateZ(" + (z * 100 + 125) + "px) rotateX(-90deg)" 
  });
  stats.css({
    "-webkit-transform": "translateY(-625px) translateZ(" + (z * 100 + 200) + "px) rotateX(-90deg)" 
  });
  /* END BASIC WORLD FLOATING DEPENDING ON WHICH FLOOR */
  
  /* MOVEMENT OF THE CUBE ITSELF */
  cube.css({
    "-webkit-transform":
    "translateX(" + y * 100 + "px)" +
    "translateY(" + x * 100 + "px)" + 
    "translateZ(" + (z * 100 + 51) + "px)"
  });
  /* END MOVEMENT OF THE CUBE ITSELF */
  
  /* RESULTS & FLOOR maps.length */
  if ((x >= 0) && (y >= 0) && (z == maps.length)) { 
    result.html("Congratulations!");
    goal++;
    if ( goal == 1 ) {
      stats.html("You've scored: " + moves * 79 + "/10428 points");
      $('#goal')[0].play();
      $('#cube li').css({
        "background":"rgba(255,255,255,.9)",
        "box-shadow":"0 0 10px rgba(255,255,255,1)"
      });
    }
  } else {
    result.html("Moves " + moves + " Floor " + z + "/10");
  }
  /* END RESULTS & FLOOR 10 */
  
});