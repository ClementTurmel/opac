let assert = chai.assert;

//shorter blocks constants variables for test assertion 
const E = blocks.EMPTY;
const C = blocks.CRATE;
const D = blocks.CRATEDEAD;
const G = blocks.GHOST;
const A = blocks.GHOSTAFRAID;
const R = blocks.EATERRIGHT;
const L = blocks.EATERLEFT;
const F = blocks.FAIRY;

describe('basic test', function () {
    describe('Boolean', function () {
        it('Boolean true if not equals to false', function () {
            assert(true !== false);
        });
    });
});

describe('Initialisation', function () {
    describe('Starting the game, after initGameGrid()', function () {
        it('all blocks of the Grid should be empty', function () {
            initGameGrid();

            var expectedEmptyGrid = [
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E]
            ];

            assert.deepEqual(grid, expectedEmptyGrid);

        });
    });
    
    describe('when bindNextBlocksToTopOfTheGrid() is called given 4 blocks', function () {
        var nextBlocks = [
            [blocks.CRATE, blocks.EMPTY],
            [blocks.CRATE, blocks.EATERLEFT]
        ];

        before(function(){
            initGameGrid();
            bindNextBlocksToTopOfTheGrid(nextBlocks);
        });

        it('Grid at [0][2] block should be a CRATE', function () {
            assert.equal(grid[0][2].VALUE , blocks.CRATE.VALUE)
        });
        it('Grid at [0][3] block should be a EMPTY', function () {
            assert.equal(grid[0][3].VALUE , blocks.EMPTY.VALUE)
        });
        it('Grid at [1][2] block should be a CRATE', function () {
            assert.equal(grid[1][2].VALUE , blocks.CRATE.VALUE)
        });
        it('Grid at [1][3] block should be a EATERLEFT', function () {
            assert.equal(grid[1][3].VALUE , blocks.EATERLEFT.VALUE)
        });
    });

    describe('calling resetPosition()', function () {
        
        before(function(){
            currentRow = 3;
            xPosition = 4;
            resetPosition();
        });

        it('currentRow should be valorized at 1', function () {
            assert.equal(currentRow, 1);
        });
        it('xPosition should be valorized at 2', function () {
            assert.equal(xPosition, 2);
        });
    });

});

describe('State resolution', function () {
    describe('calling isFullCrateRow() given a row full of crate', function () {
        it('method should return true', function () {
            initGameGrid();
            grid[lastRow] = [C,C,C,C,C,C];
            assert.isTrue(isFullCrateRow(lastRow));
        });
    });
    describe('calling isFullCrateRow() given a row with at least a non crate block', function () {
        it('method should return false', function () {
            initGameGrid();
            grid[lastRow] = [C,C,G,C,C,C];
            assert.isFalse(isFullCrateRow(lastRow));
        });
    });
    describe('calling deleteLine() given a row', function () {
        it('this row must be deleted and rows before it should goes down', function () {
            initGameGrid();
            console.log("lastRow is : " + lastRow);

            grid[lastRow-1] = [E,E,G,C,E,C];
            grid[lastRow]   = [C,C,C,C,C,C];
            
            deleteRow(lastRow);
            assert.deepEqual(grid[lastRow-1], [E,E,E,E,E,E]);
            assert.deepEqual(grid[lastRow],   [E,E,G,C,E,C]);
        });
    });
    describe('calling deleteLine() given a grid with blocks on each playable rows', function () {
        it('the first visible row will be empty', function () {
            initGameGrid();
            var initialGrid = [
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [C,C,C,E,E,E],
                [C,C,C,G,E,E],
                [C,C,G,G,E,E],
                [C,C,C,C,C,G],
                [G,C,C,C,C,C],
                [C,G,G,C,C,C],
                [C,C,C,G,C,C],
                [C,C,C,C,G,C],
                [C,C,C,C,C,G],
                [C,C,C,C,G,C],
                [C,C,C,G,C,C],
                [G,C,C,G,G,G],
                [C,C,C,C,C,C]
            ];
            grid = initialGrid;
            deleteRow(lastRow);
            
            var expectedGrid = [
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [E,E,E,E,E,E],
                [C,C,C,E,E,E],
                [C,C,C,G,E,E],
                [C,C,G,G,E,E],
                [C,C,C,C,C,G],
                [G,C,C,C,C,C],
                [C,G,G,C,C,C],
                [C,C,C,G,C,C],
                [C,C,C,C,G,C],
                [C,C,C,C,C,G],
                [C,C,C,C,G,C],
                [C,C,C,G,C,C],
                [G,C,C,G,G,G]
            ];
            console.log(expectedGrid);
            console.log(grid);
            assert.deepEqual(grid, expectedGrid);
        });
    });
});