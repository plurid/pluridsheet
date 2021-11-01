// #region imports
    // #region libraries
    import React from 'react';

    import {
        select,
    } from '@storybook/addon-knobs';

    import themes from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export const themeLabel = 'Theme';
const computeThemeOptions = () => {
    const options: any = {};
    for (const key of Object.keys(themes)) {
        options[key] = key;
    }
    return options;
}
export const themeOptions = computeThemeOptions();
export const defaultThemeValue = 'plurid';

export const themeSelect = () => select(
    themeLabel,
    themeOptions,
    defaultThemeValue,
);


export const Background: React.FC<any> = (
    properties,
) => {
    // #region properties
    const {
        children,
    } = properties;
    // #endregion properties

    // #region render
    return (
        <div
            style={{
                backgroundColor: 'slategray',
                padding: '2rem',
            }}
        >
            {children}
        </div>
    );
    // #endregion render
}
// #endregion module
