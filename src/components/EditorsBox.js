import React from 'react';
import { Box } from '@chakra-ui/react';

const EditorsBox = ({ children }) => {
    return (
        <Box backgroundColor='#FFFFFF' marginY={2}  >
            {children}
        </Box>
    );
};

export default EditorsBox;
