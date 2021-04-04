function showModal(text){
    modal = document.getElementById("game-info");
    modal.innerHTML = text;
    modal.hidden = false;
}

function hideModal(){
    modal = document.getElementById("game-info");
    modal.hidden = true;
}

function displayGrid(){
    clearView();
    displayBackground();
    displayBlocks();
}

function clearView(){
    ctx.clearRect(0, 0, blockSize * gridColumnNumber, blockSize * gridRowNumber);
}

function displayBackground(){
    ctx.fillRect(0, 0, blockSize * gridColumnNumber, blockSize * gridRowNumber);
    ctx.fillStyle = "grey";
}

function displayBlocks(){
    for (var i = 0; i < grid.length ; i++)
    {
        for (var y = 0; y < grid[i].length; y++)
        {
            if(grid[i][y] != blocks.EMPTY){
                displayBlock(i, y, grid[i][y]);
            }           
        }
    }
}

function displayBlock(row, column, block){    
    ctx.drawImage(block.IMAGE,(column)*(blockSize), (row)*(blockSize));  
}

function getImageObject(imageFile){
    var image = new Image();
    image.src = blocksImagePath+imageFile;
    //console.log("image ["+blocksImagePath+imageFile+"] loaded");
    return image;
}

function blinkRowBlock(blinkingRow){
    console.log("blinkRowBlock !");
    clearView();
    displayBackground();
    sleep(1000);
    displayGrid();
    sleep(1000);
}

function displayGridExceptRow(blinkingRow, isVisible){
    console.log("displayGridExceptRow !");
    for (var i = 0; i < grid.length ; i++)
    {
        
        if( (i != blinkingRow)) {
            console.log("la ligne " + i + " est affichée");
            for (var y = 0; y < grid[i].length; y++)
            {
                if(grid[i][y] != blocks.EMPTY){
                    displayBlock(i, y, grid[i][y]);
                }           
            }
        }else{
            console.log("la ligne " + i + " n'EST PAS est affichée");
        }
        
    }
}

function sleep(milliseconds) {
    console.log("sleep " + milliseconds);
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}