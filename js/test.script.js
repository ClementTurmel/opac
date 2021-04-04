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
            console.log("it 1");
            console.log(grid[0][2].VALUE);
            assert.equal(grid[0][2].VALUE , blocks.CRATE.VALUE)
        });
        it('Grid at [0][3] block should be a EMPTY', function () {
            console.log("it 2");
            assert.equal(grid[0][3].VALUE , blocks.EMPTY.VALUE)
        });
        it('Grid at [1][2] block should be a CRATE', function () {
            console.log("it 3");
            assert.equal(grid[1][2].VALUE , blocks.CRATE.VALUE)
        });
        it('Grid at [1][3] block should be a EATERLEFT', function () {
            console.log("it 4");
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