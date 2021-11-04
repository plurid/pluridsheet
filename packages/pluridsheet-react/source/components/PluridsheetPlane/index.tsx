// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import {
        plurid,
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridIconAdd,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        defaultColumns,
        defaultRows,
    } from '~data/constants';

    import PluridsheetCell from '~components/PluridsheetCell';

    import PluridsheetEngine from '~logic/PluridsheetEngine';

    import {
        numberToLetterColumn,
    } from '~utilities/index';
    // #endregion external


    // #region internal
    import {
        StyledPluridsheetPlane,
        StyledPluridsheetArea,
        StyledPluridsheetRow,
    } from './styled';
    // #endregion internal
// #region imports



// #region module
const pluridsheetEngine = new PluridsheetEngine();


export interface PluridsheetPlaneProperties {
    // #region required
        // #region values
        theme: Theme;
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion required
}

const PluridsheetPlane: React.FC<PluridsheetPlaneProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme: themeProperty,
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion required
    } = properties;

    const theme = themeProperty || plurid;

    const sheetID = '1';
    // #endregion properties


    // #region state
    const [
        formulaMode,
        setFormulaMode,
    ] = useState(false);

    const [
        inputCell,
        setInputCell,
    ] = useState('');

    const [
        columns,
        setColumns,
    ] = useState([
        ...defaultColumns,
    ]);

    const [
        rows,
        setRows,
    ] = useState([
        ...defaultRows,
    ]);
    // #endregion state


    // #region handlers
    const addColumn = () => {
        const nextColumnIndex = (columns.length + 1);
        const nextColumn = numberToLetterColumn(nextColumnIndex);
        if (!nextColumn) {
            return;
        }

        setColumns(columns => [
            ...columns,
            nextColumn,
        ]);
    }

    const addRow = () => {
        const nextRow = (rows.length + 1) + '';

        setRows(rows => [
            ...rows,
            nextRow,
        ]);
    }
    // #endregion handlers


    // #region render
    return (
        <StyledPluridsheetPlane
            theme={theme}
        >
            <StyledPluridsheetArea
                theme={theme}
            >
                <StyledPluridsheetRow>
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '1rem',
                        }}
                    />

                    {rows.map((row) => {
                        return (
                            <div
                                key={`header-rows-${row}`}
                                style={{
                                    textAlign: 'right',
                                    padding: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'right',
                                }}
                            >
                                {row}
                            </div>
                        );
                    })}
                </StyledPluridsheetRow>

                {columns.map((column, index) => {
                    const lastColumn = index === columns.length - 1;

                    return (
                        <div
                            key={`column-${column}`}
                            style={{
                                paddingRight: lastColumn ? '1.5rem' : undefined,
                            }}
                        >
                            <div
                                key={`header-column-${column}`}
                                style={{
                                    textAlign: 'center',
                                    padding: '0.5rem',
                                }}
                            >
                                {column}
                            </div>

                            <StyledPluridsheetRow>
                                {rows.map((row) => {
                                    const cellName = sheetID + column + row;

                                    return (
                                        <PluridsheetCell
                                            key={`cell-${column}-${row}`}
                                            name={cellName}
                                            location={column + row}
                                            theme={plurid}
                                            formulaMode={formulaMode}
                                            inputCell={inputCell === cellName}

                                            getValue={() => {
                                                const cell = pluridsheetEngine.getCell(cellName);
                                                return cell.value as string;
                                            }}
                                            getDisplay={() => {
                                                // setFormulaMode(false);
                                                // setInputCell('');

                                                const cell = pluridsheetEngine.getCell(cellName);

                                                if (typeof cell.value === 'string') {
                                                    if (cell.resolved && cell.value.startsWith('=')) {
                                                        return cell.display;
                                                    }
                                                }

                                                return cell.value as string;
                                            }}
                                            setValue={(value) => {
                                                if (value.trim().startsWith('=')) {
                                                    setFormulaMode(true);
                                                    setInputCell(cellName);
                                                }

                                                const parsedValue = parseInt(value)
                                                    ? parseInt(value)
                                                    : value;

                                                pluridsheetEngine.setCell({
                                                    z: '1',
                                                    y: column,
                                                    x: row,
                                                    value: parsedValue,
                                                });
                                            }}
                                            selectCell={() => {
                                                console.log('cellName', cellName);
                                            }}
                                        />
                                    );
                                })}
                            </StyledPluridsheetRow>
                        </div>
                    );
                })}
            </StyledPluridsheetArea>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    padding: '1rem',
                }}
            >
                <PluridIconAdd
                    title="add row"
                    atClick={addRow}
                />

                <PluridIconAdd
                    title="add column"
                    atClick={addColumn}
                />
            </div>
        </StyledPluridsheetPlane>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default PluridsheetPlane;
// #endregion exports
