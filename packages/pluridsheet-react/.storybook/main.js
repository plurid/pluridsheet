const path = require('path');



module.exports = {
    stories: [
        '../source/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
    ],
    webpackFinal: async (config, { configType }) => {
        config.resolve.modules = [
            ...(config.resolve.modules || []),
            path.resolve(__dirname, '../'),
            path.resolve(__dirname, '../source'),
        ];

        config.resolve.alias = {
            ...config.resolve.alias,
            "~data": path.resolve(__dirname, "../source/data"),
            "~components": path.resolve(__dirname, "../source/components"),
            "~utilities": path.resolve(__dirname, "../source/utilities"),
            "~logic": path.resolve(__dirname, "../source/logic"),
        };

        return config;
    },
};
