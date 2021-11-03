// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    // #endregion external


    // #region internal
    import {
        StyledPluridsheetCell,
    } from './styled';
    // #endregion internal
// #region imports



// #region module
export interface PluridsheetCellProperties {
    // #region required
        // #region values
        location: string
        theme: Theme;
        // #endregion values

        // #region methods
        getValue: () => string;
        getDisplay: () => string;
        setValue: (value: string) => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

const PluridsheetCell: React.FC<PluridsheetCellProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            location,
            theme,
            // #endregion values

            // #region methods
            getValue,
            getDisplay,
            setValue,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region state
    const [
        localValue,
        setLocalValue,
    ] = useState(getValue());
    // #endregion state


    // #region render
    return (
        <StyledPluridsheetCell
            theme={theme}
        >
            <input
                value={localValue}
                placeholder={location}
                onBlur={() => {
                    setLocalValue(getDisplay());
                }}
                onFocus={() => {
                    setLocalValue(getValue());
                }}
                onChange={(event) => {
                    setValue(event.target.value);
                    setLocalValue(getValue());
                }}
            />
        </StyledPluridsheetCell>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default PluridsheetCell;
// #endregion exports
