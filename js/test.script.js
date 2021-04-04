let assert = chai.assert;

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
            assert(grid[0][2] == blocks.CRATE, "should be a crate but its a " + grid[0][2].VALUE)
            assert(grid[0][3] == blocks.EMPTY, "should be a crate but its a " + grid[0][3].VALUE)
            assert(grid[1][2] == blocks.CRATE, "should be a crate but its a " + grid[1][2].VALUE)
            assert(grid[1][3] == blocks.EATERLEFT, "should be a crate but its a " + grid[1][3].VALUE)
        });
    });

});