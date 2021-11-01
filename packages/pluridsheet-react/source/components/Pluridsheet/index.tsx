// #region imports
    // #region libraries
    import React from 'react';

    import {
        plurid,
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridApplication,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import PluridsheetPlane from '~components/PluridsheetPlane';
    // #endregion external


    // #region internal
    import {
        StyledPluridsheet,
    } from './styled';
    // #endregion internal
// #region imports



// #region module
export interface PluridsheetProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        theme?: Theme;
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

const Pluridsheet: React.FC<PluridsheetProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            theme: themeProperty,
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional
    } = properties;

    const theme = themeProperty || plurid;
    // #endregion properties


    // #region render
    return (
        <StyledPluridsheet
            theme={theme}
        >
            <PluridApplication
                planes={[
                    {
                        route: '/pluridsheet/:id',
                        component: PluridsheetPlane,
                    },
                ]}
                view={[
                    '/pluridsheet/1',
                ]}
            />
        </StyledPluridsheet>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Pluridsheet;
// #endregion exports
