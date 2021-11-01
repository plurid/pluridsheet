// #region imports
    // #region libraries
    import React from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    // #endregion external


    // #region internal
    import {
        StyledPluridsheetPlane,
    } from './styled';
    // #endregion internal
// #region imports



// #region module
export interface PluridsheetPlaneProperties {
    // #region required
        // #region values
        theme: Theme;
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
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

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region render
    return (
        <StyledPluridsheetPlane
            theme={theme}
        >
            PluridsheetPlane
        </StyledPluridsheetPlane>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default PluridsheetPlane;
// #endregion exports
