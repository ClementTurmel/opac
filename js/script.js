const gridRowNumber = 15; //game is initialized with 15 rows to set nextblock at the top, but two firt rows wont be visible at the end
const gridColumnNumber = 6;
const nonVisibleRow = 2;
const lastRow = gridRowNumber - nonVisibleRow;
const blockSize = 32; //pixel
const blocksImagePath = "images/blocks/";

var tickTime = 600; //ms
var interval;
var canvas;
var ctx;

var currentRow = 1;
var xPosition = 2; //this represent the block at the bottom-left of movable blocks (value between 0-4)

var isGamePaused = false

var grid;

const blocks = {
    EMPTY:          {VALUE : 'empty',           IMAGE : getImageObject('empty.png')}, 
    CRATE:          {VALUE : 'crate',           IMAGE : getImageObject('crate.png')}, 
    CRATEDEAD:      {VALUE : 'crate-dead',      IMAGE : getImageObject('crate_dead.png')}, 
    GHOST:          {VALUE : 'ghost',           IMAGE : getImageObject('ghost.png')}, 
    GHOSTAFRAID:    {VALUE : 'ghost-afraid',    IMAGE : getImageObject('ghost_afraid.png')}, 
    EATERRIGHT:     {VALUE : 'eater-right',     IMAGE : getImageObject('eaterR.png')}, 
    EATERLEFT:      {VALUE : 'eater-left',      IMAGE : getImageObject('eaterL.png')}, 
    FAIRY:          {VALUE : 'fairy',           IMAGE : getImageObject('fairy.png')}
}

function initGameGrid(){
    console.log("initGameGrid started !")
    grid = new Array(gridRowNumber);
    for (var i = 0; i < gridRowNumber; i++)
    {
        grid[i] = new Array(gridColumnNumber);
        
        for (var y = 0; y < gridColumnNumber; y++)
        {
            grid[i][y] = blocks.EMPTY;
        }
    }
}

function initNextBlock(){
    var nextBlocks = [
        [blocks.CRATE, blocks.GHOST],
        [blocks.EMPTY, blocks.EATERLEFT]
    ];
    return nextBlocks;
}

function resetPosition(){
    currentRow = 1;
    xPosition = 2;
}

function bindNextBlocksToTopOfTheGrid(nextBlocks){
    console.log("bindNextBlocksToTopOfTheGrid !");
    grid[0][2] = nextBlocks[0][0];
    grid[0][3] = nextBlocks[0][1];
    grid[1][2] = nextBlocks[1][0];
    grid[1][3] = nextBlocks[1][1];
}

// function inGame(){
//     interval = setInterval(tick , tickTime);
// }

function inGame(){
    interval = setInterval(function(){
        if(!isGamePaused){
            tick();
        }
    }, tickTime);
}


function tick(){
    console.log("tick");
    if(canPlayerBlocksFallDown() === true){
        playerBlockFallDown();
        currentRow++;

    }else{
    //end of players movement for current iteration, resolve blocks behaviors
        
        /*
        *********************************
        Algorithm :
        *********************************
        if isBlockOnRowOne
            end of the game (TODO verify with original game)
        
        resolve gravity TODO
        if eater TODO
            resolve eater
            resolve gravity
            
        resolve full lign of crate block to delete TODO :
            if isLastLignAllCrate
                delete last lign
                repeat resolve full lign of crate to delete
            else
                nothing to delete 
        *********************************
        */

        var rowFullofCrate = isFullCrateRow(14); //testing
        console.log("dois-je supprimer la ligne ? " + rowFullofCrate);
        if(rowFullofCrate == true){
            deleteLine(14);
        }
        
        //next game iteration
        resetPosition();
        var nextBlocks = initNextBlock();
        bindNextBlocksToTopOfTheGrid(nextBlocks);
    }
    displayGrid();
}

function isFullCrateRow(lineNumber){
    var isFullCrateRow = true;
    
    for (var i = 0; i < gridColumnNumber; i++){
        console.log("le block a l'indice " + i + " est un " + grid[lineNumber][i].VALUE);
        if( grid[lineNumber][i] != blocks.CRATE){
            isFullCrateRow = false;
        }
    }
    return isFullCrateRow;
}

/* delete row by replacing it with previous rows  */
function deleteLine(lineNumber){
    for (var i = lineNumber; i >= 1; i--)
    {
        for (var y = 0; y < gridColumnNumber; y++)
        {
            console.log("le bloc i" + i + "y" + y +  " " + grid[i][y].VALUE + " va prendre la position de " + grid[i-1][y].VALUE);
            grid[i][y] = grid[i-1][y];
        }
        //todo: la première linee se retrouve forcément vide.
    }
}

function playerBlockFallDown(){
    if(grid[currentRow][xPosition] != blocks.EMPTY){
        grid[currentRow+1][xPosition] = grid[currentRow][xPosition];
    }
    if(grid[currentRow][xPosition+1] != blocks.EMPTY){
        grid[currentRow+1][xPosition+1] = grid[currentRow][xPosition+1];
    }
    
    grid[currentRow][xPosition] = grid[currentRow-1][xPosition];
    grid[currentRow][xPosition+1] = grid[currentRow-1][xPosition+1];

    grid[currentRow-1][xPosition] = blocks.EMPTY;
    grid[currentRow-1][xPosition+1] = blocks.EMPTY;
}

function canPlayerBlocksFallDown(){
    if(isCurrentBlocksOnLastRow() || isBlocksUnderCurrentBlocks()){
        return false;
    }else{
        return true;
    }
}

function isCurrentBlocksOnLastRow(){
    return currentRow > lastRow;
}

function isBlocksUnderCurrentBlocks(){
    var y0x0 = grid[currentRow][xPosition];
    var y0x1 = grid[currentRow][xPosition+1];   
    var y1x0 = grid[currentRow+1][xPosition];
    var y1x1 = grid[currentRow+1][xPosition+1];

    if(((y0x0 != blocks.EMPTY) && (y1x0 != blocks.EMPTY)) || ((y0x1 != blocks.EMPTY) && (y1x1 != blocks.EMPTY))){
        //console.log("block under me ! current row : " + currentRow + " xPosition : " + xPosition);
        return true;
    }
}

function rotate(){
    //Warning : bellow rotation is not like original game
    if(allOfFourBlocksArePlain() == false){
        var tempBlock = grid[currentRow][xPosition];
        grid[currentRow][xPosition] = grid[currentRow][xPosition+1];
        grid[currentRow][xPosition+1] = grid[currentRow-1][xPosition+1];
        grid[currentRow-1][xPosition+1] = grid[currentRow-1][xPosition];
        grid[currentRow-1][xPosition] = tempBlock;
    }
}

function allOfFourBlocksArePlain(){
    if((grid[currentRow][xPosition] != blocks.EMPTY)
    && (grid[currentRow][xPosition+1] != blocks.EMPTY)
    && (grid[currentRow-1][xPosition] != blocks.EMPTY)
    && (grid[currentRow-1][xPosition+1] != blocks.EMPTY)){
        return true;
    }else{
        return false;
    }
}

function moveRight(){
    if(doesBlocksCanGoRight()){
        moveBlocksToRight();
    }
}

function doesBlocksCanGoRight(){
    if(xPosition == 4){
       return false;
    }else{
        if(grid[currentRow][xPosition+1] != blocks.EMPTY && grid[currentRow][xPosition+2] != blocks.EMPTY){
            //console.log("can't go right !" +grid[currentRow][xPosition+1].VALUE +"|" + grid[currentRow][xPosition+2].VALUE);
            return false;
        }else{
            return true;
        }
    }
}

function moveBlocksToRight(){
    y0xp1 = grid[currentRow][xPosition+1];
    y1x0 = grid[currentRow-1][xPosition];
    y1xp1 = grid[currentRow-1][xPosition+1];
    
    if(grid[currentRow][xPosition+1] != blocks.EMPTY){
        grid[currentRow][xPosition+2] = grid[currentRow][xPosition+1];
    }
    
    grid[currentRow-1][xPosition+2] = grid[currentRow-1][xPosition+1];
    grid[currentRow-1][xPosition+1] = grid[currentRow-1][xPosition];
    
    if((y0xp1 != blocks.EMPTY) && (y1x0 != blocks.EMPTY) && (y1xp1 != blocks.EMPTY)){
        grid[currentRow][xPosition+1] = blocks.EMPTY; //avoid block duplication
    }else{
        grid[currentRow][xPosition+1] = grid[currentRow][xPosition];
        grid[currentRow][xPosition] = blocks.EMPTY;
    }

    grid[currentRow-1][xPosition] = blocks.EMPTY;
    xPosition++;
}

function moveLeft(){
    if(doesBlocksCanGoLeft()){
        moveBlocksToLeft();
    }
}

function doesBlocksCanGoLeft(){
    if(xPosition == 0){
       return false;
    }else{
        if(grid[currentRow][xPosition] != blocks.EMPTY && grid[currentRow][xPosition-1] != blocks.EMPTY){
            //console.log("can't go left !" +grid[currentRow][xPosition].VALUE +"|" + grid[currentRow][xPosition-1].VALUE);
            return false;
        }else{
            return true;
        }
    }
}

function moveBlocksToLeft(){
    y0x0 = grid[currentRow][xPosition];
    y1x0 = grid[currentRow-1][xPosition];
    y1xp1 = grid[currentRow-1][xPosition+1];
    
    if(grid[currentRow][xPosition] != blocks.EMPTY){
        grid[currentRow][xPosition-1] = grid[currentRow][xPosition];
    }
    
    grid[currentRow-1][xPosition-1] = grid[currentRow-1][xPosition];
    grid[currentRow-1][xPosition] = grid[currentRow-1][xPosition+1];
    
    if((y0x0 != blocks.EMPTY) && (y1x0 != blocks.EMPTY) && (y1xp1 != blocks.EMPTY)){
        grid[currentRow][xPosition] = blocks.EMPTY; //avoid block duplication
    }else{
        grid[currentRow][xPosition] = grid[currentRow][xPosition+1];
        grid[currentRow][xPosition+1] = blocks.EMPTY;
    }

    grid[currentRow-1][xPosition+1] = blocks.EMPTY;
    xPosition--;
}

function moveDown(){
    tick();
    //TODO increase player's point
    clearInterval( interval );
    inGame();
}

function pauseGame(){
    if(isGamePaused){
        isGamePaused = false;
        hideModal();
    }else{
        isGamePaused = true;
        showModal("Pause");
    }
}

function onkeyPress(key){
    switch ( key ) {
        case RIGHT:
            moveRight();
            break;
        case LEFT:
            moveLeft();
            break;
        case UP:
            rotate();
            break;
        case DOWN:
            moveDown();
            break;
        case SPACE:
            pauseGame();
            break;
    }
    displayGrid();
}


function main(){
    hideModal();
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    initGameGrid();
    // *************** START TESTING **************
    grid[14][0] = blocks.CRATE;
    grid[14][1] = blocks.CRATE;
    grid[14][2] = blocks.CRATE;
    //grid[14][3] = blocks.CRATE;
    grid[14][4] = blocks.CRATE;
    grid[14][5] = blocks.CRATE;
    // **************** END TESTING ***************
    displayGrid();
    var nextBlocks = initNextBlock();
    bindNextBlocksToTopOfTheGrid(nextBlocks);
    displayGrid();
    
    inGame();
}

