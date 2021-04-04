const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';
const SPACE = 'space';

const keys = {
    37: LEFT,
    39: RIGHT,
    38: UP,
    40: DOWN,
    32: SPACE
}

document.body.onkeydown = function( e ) {

    console.log("key pressed is : " + e.keyCode + " -> " + keys[e.keyCode]);
    if (isKnownKeys) {
        e.preventDefault(); //avoid moving/scrolling page
        
        if(!isGamePaused || keys[ e.keyCode ] == SPACE){
            onkeyPress( keys[ e.keyCode ] );
        }
        
    }
};

function isKnownKeys(keyPressed){
    return typeof keys[ keyPressed.keyCode ] != 'undefined';
}