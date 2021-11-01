// #region imports
    // #region libraries
    import React from 'react';

    import {
        plurid,
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import PluridsheetCell from '~components/PluridsheetCell';

    import PluridsheetEngine from '~logic/PluridsheetEngine';
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

    const columns = ['A', 'B', 'C', 'D'];
    const rows = ['1', '2', '3', '4'];
    // #endregion properties


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

                            const value = pluridsheetEngine.getCell(cellName).display;

                            return (
                                <PluridsheetCell
                                    key={`cell-${column}-${row}`}
                                    location={column + row}
                                    theme={plurid}

                                    getValue={() => {
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
        </StyledPluridsheetPlane>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default PluridsheetPlane;
// #endregion exports
