// #region imports
    // #region libraries
    import React from 'react';

    import themes from '@plurid/plurid-themes';

    import { storiesOf } from '@storybook/react';
    // import { action } from '@storybook/addon-actions';
    import {
        withKnobs,
        select,
    } from '@storybook/addon-knobs';
    // #endregion libraries


    // #region external
    import {
        themeLabel,
        themeOptions,
        defaultThemeValue,
    } from '~utilities/storybook';

    import Pluridsheet from '../';
    // #endregion external
// #endregion imports



// #region module
storiesOf(
    'Pluridsheet',
    module,
)
.addDecorator(withKnobs)
.add('Pluridsheet', () => {
    const theme = select(themeLabel, themeOptions, defaultThemeValue);

    return (
        <div
            style={{
                backgroundColor: 'black',
                height: '800px',
                padding: '2rem',
            }}
        >
            <Pluridsheet
                theme={themes[theme]}
            />
        </div>
    );
});
// #endregion module
