import { extendTheme, theme as chakraTheme } from '@chakra-ui/react';

const customTheme = {
    styles: {
        ...chakraTheme,
    },
    colors: {
        ...chakraTheme.colors,
    },
    space: {
        ...chakraTheme.space,
        layout: { base: '0 40px' }
    },
};

export default extendTheme(customTheme);
