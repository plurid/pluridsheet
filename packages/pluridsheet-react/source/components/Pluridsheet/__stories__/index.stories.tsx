// #region imports
    // #region libraries
    import React from 'react';
    import {
        ComponentStory,
        ComponentMeta,
    } from '@storybook/react';
    // #endregion libraries


    // #region external
    import Pluridsheet from '../';
    // #endregion external
// #endregion imports



// #region module
export default {
    title: 'Pluridsheet',
    component: Pluridsheet,
} as ComponentMeta<typeof Pluridsheet>;


const Template: ComponentStory<typeof Pluridsheet> = (args) => <Pluridsheet {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
// #endregion module
