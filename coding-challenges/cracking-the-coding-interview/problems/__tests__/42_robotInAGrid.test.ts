import robotInAGrid from "../42_robotInAGrid";

describe('robotInAGrid', () => {
    describe('valid input', () => {
        test('returns correct path for a 3x3 grid', () => {
            const grid1: boolean[][] = [
                [true, true, false],
                [true, false, true],
                [true, true, true]
            ];
            expect(robotInAGrid(grid1)).toEqual([[0, 0], [0, 1], [1, 1], [2, 1], [2, 2]]);
        });

        test('returns correct path for a 4x4 grid', () => {
            const grid2: boolean[][] = [
                [true, true, true, false],
                [true, false, true, true],
                [true, true, true, false],
                [true, true, true, true]
            ];
            expect(robotInAGrid(grid2)).toEqual([[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 3], [3, 3]]);
        });
    });

    describe('invalid input', () => {
        test('returns null for an empty grid', () => {
            const grid3: boolean[][] = [];
            expect(robotInAGrid(grid3)).toBeNull();
        });

        test('returns null for a grid with only obstacles', () => {
            const grid4: boolean[][] = [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ];
            expect(robotInAGrid(grid4)).toBeNull();
        });

        test('returns null if starting position is an obstacle', () => {
            const grid5: boolean[][] = [
                [false, true, true],
                [true, true, true],
                [true, true, true]
            ];
            expect(robotInAGrid(grid5)).toBeNull();
        });
    });
});
