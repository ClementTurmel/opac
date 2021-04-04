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


describe('Test basique', function () {
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
        it('Those 4 blocks should be asign at top of the grid', function () {
            var nextBlocks = [
                [blocks.CRATE, blocks.EMPTY],
                [blocks.CRATE, blocks.EATERLEFT]
            ];

            initGameGrid();
            bindNextBlocksToTopOfTheGrid(nextBlocks);
            assert(grid[0][2] == blocks.CRATE, "should be a CRATE but its a " + grid[0][2].VALUE)
            assert(grid[0][3] == blocks.EMPTY, "should be a EMPTY but its a " + grid[0][3].VALUE)
            assert(grid[1][2] == blocks.CRATE, "should be a CRATE but its a " + grid[1][2].VALUE)
            assert(grid[1][3] == blocks.EATERLEFT, "should be a EATERLEFT but its a " + grid[1][3].VALUE)
        });
    });

});