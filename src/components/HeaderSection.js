import React from 'react';
import { Link, Flex, Image, Spacer, Box, Text } from '@chakra-ui/react';

import legosIcon from './../legos.png'
import MenuDropdown from './MenuDropdown';

const HeaderSection = ({
    setIsExample
}) => {

    return (
        <Flex minWidth='max-content' alignItems='center' gap='2' h={24} bgColor="white"
            p={{ base: '0 40px' }}>
            <Flex flexDir="row">
                <Box w="110px" >
                    <MenuDropdown setIsExample={setIsExample} />
                </Box>
            </Flex>
            <Spacer></Spacer>
            <Link href='/' >
                <Box ml="10px">
                    <Text
                        fontSize="1.5rem"
                        as="h2"
                        fontWeight="bold"
                    >
                        LEGOS-A
                    </Text>
                    <Spacer />
                </Box>
            </Link>
            <Link href='/' >
                <Image src={legosIcon} w={71} h={12} alt="Logo" mr={0} />
            </Link>
        </Flex>
    );
};

export default HeaderSection;
