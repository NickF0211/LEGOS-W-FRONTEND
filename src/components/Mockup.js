import React from 'react';
import { Box, Flex, } from '@chakra-ui/react';
import HeaderSection from './HeaderSection';

const Mockup = ({
    children, setIsExample
}) => {
    return (
        <>
            <HeaderSection setIsExample={setIsExample} />
            <Flex
                flexGrow={1}
                alignItems={'center'}
                bgColor="#2C5282">
                <Box flex="1 1 100%" mb={27} mt={57}>
                    <Flex
                        flexDir="column"
                        overflow="hidden"
                        flex={1}
                        height="100%"
                        width="100%"
                    >
                        {children?.content ? children.content : children}
                    </Flex>
                </Box>
            </Flex >
            {/*Will be uncoment once we need this*/}
            {/* <ContactsBlock />. */}
        </>
    );
};

export default Mockup;
