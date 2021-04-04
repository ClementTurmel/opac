const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';
const SPACE = 'space';

const game_keys = {
    37: LEFT,
    39: RIGHT,
    38: UP,
    40: DOWN,
    32: SPACE
}


const tech_keys = {
    116: 'F5',
    123: 'F12',
}

document.body.onkeydown = function( e ) {

    console.log("key pressed is : " + e.keyCode + " -> " + game_keys[e.keyCode]);
    if (!isKnownKeys(e.keyCode) && !isKnownTechKeys(e.keyCode)) {
        console.log("NOP ! ");
        e.preventDefault();
    }else{ 
        console.log("this is a known key ! ");
        //e.preventDefault(); //avoid moving/scrolling page
        
        if(!isGamePaused || game_keys[ e.keyCode ] == SPACE){
            onkeyPress( game_keys[ e.keyCode ] );
        }
    }
};

function isKnownKeys(keyPressed){
    return typeof game_keys[ keyPressed ] != 'undefined';
}

function isKnownTechKeys(keyPressed){
    return typeof tech_keys[ keyPressed ] != 'undefined';
}