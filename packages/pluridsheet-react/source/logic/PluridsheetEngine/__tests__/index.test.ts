// #region imports
    // #region external
    import PluridsheetEngine from '../';
    // #endregion external
// #endregion imports



// #region module
describe('PluridsheetEngine', () => {
    it(`works`, () => {
        const pluridsheetEngine = new PluridsheetEngine();

        pluridsheetEngine.setCell({
            z: '1', // layer
            y: 'A', // column
            x: '1', // row
            value: 5,
        });

        pluridsheetEngine.setCell({
            z: '1', // layer
            y: 'A', // column
            x: '2', // row
            value: 7,
        });

        pluridsheetEngine.setCell({
            z: '1', // layer
            y: 'A', // column
            x: '3', // row
            value: '= 1A1 + 1A2', // 12
        });

        const cell = pluridsheetEngine.getCell({
            z: '1', // layer
            y: 'A', // column
            x: '3', // row
        });

        expect(cell.display).toEqual('12');
    });
});
// #endregion module
