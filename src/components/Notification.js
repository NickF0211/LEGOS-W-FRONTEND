import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
function Notification({
    infoText = '',
    top = 'auto',
    left = 'auto'
}) {
    return (
        <Flex
            w="200px"
            bgColor='#FFFFFF'
            borderWidth={1}
            borderColor='#D10101'
            p="2"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            right="320px"
            top={top}
            bottom={24}
            left={left}
        >
            <Text fontSize="10px">{infoText}</Text>
        </Flex>
    );
}

export default Notification;