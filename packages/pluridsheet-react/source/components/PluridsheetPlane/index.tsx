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
            theme,
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion required
    } = properties;
    // #endregion properties


    // #region state
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
            {columns.map((column) => {
                return (
                    <StyledPluridsheetRow
                        key={`column-${column}`}
                    >
                        {rows.map((row) => {
                            const cellName = `1${column}${row}`;

                            return (
                                <PluridsheetCell
                                    key={`cell-${column}-${row}`}
                                    location={column + row}
                                    theme={plurid}

                                    getValue={() => {
                                        const cell = pluridsheetEngine.getCell(cellName);
                                        return cell.value as string;
                                    }}
                                    getDisplay={() => {
                                        const cell = pluridsheetEngine.getCell(cellName);

                                        if (typeof cell.value === 'string') {
                                            if (cell.resolved && cell.value.startsWith('=')) {
                                                return cell.display;
                                            }
                                        }

                                        return cell.value as string;
                                    }}
                                    setValue={(value) => {
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
                                />
                            );
                        })}
                    </StyledPluridsheetRow>
                );
            })}

            <div>
                <PluridIconAdd
                    title="add column"
                    atClick={addColumn}
                />

                <PluridIconAdd
                    title="add row"
                    atClick={addRow}
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
