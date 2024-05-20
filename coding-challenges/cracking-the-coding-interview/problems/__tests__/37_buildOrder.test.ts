import buildOrder from "../37_buildOrder";

describe('buildOrder', () => {
    test('returns correct build order for valid input', () => {
        const projects1 = ['a', 'b', 'c', 'd', 'e', 'f'];
        const dependencies1 = [['a', 'd'], ['f', 'b'], ['b', 'd'], ['f', 'a'], ['d', 'c']];
        expect(buildOrder(projects1, dependencies1)).toEqual(['e', 'f', 'b', 'a', 'd', 'c']);

        const projects2 = ['a', 'b', 'c', 'd', 'e'];
        const dependencies2 = [['a', 'd'], ['f', 'b'], ['b', 'd'], ['f', 'a'], ['d', 'c']];
        expect(buildOrder(projects2, dependencies2)).toEqual('Error: No valid build order exists.');
    });

    test('returns correct build order for single project', () => {
        const projects = ['a'];
        const dependencies: [string, string][] = [];
        expect(buildOrder(projects, dependencies)).toEqual(['a']);
    });

    test('returns correct build order for empty input', () => {
        const projects: string[] = [];
        const dependencies: [string, string][] = [];
        expect(buildOrder(projects, dependencies)).toEqual([]);
    });
});
