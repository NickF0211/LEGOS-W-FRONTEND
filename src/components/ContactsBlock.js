import React from 'react';
import { Text, Box, Center } from '@chakra-ui/react';

const ContactsBlock = () => {
    return (
        <Box display="flex" as="footer" flexDirection="column" bgColor="white">
            <Box
                h={24}
                padding={{ base: '26px 0 30px 100px' }}
                justifySelf="center"
                d="flex"
                alignItems="center">
                <Center>
                    <Text fontSize="12px" fontWeight="medium" color='#46484A' textStyle="body">
                        Legos-A app
                    </Text>
                </Center>
                {/*Will be uncoment once we need this*/}
                {/* <Flex>
                    <Link href='/contact' >
                        <Text as='u' fontSize="12px" fontWeight="bold" color='#46484A' textStyle="body" mt={4}>
                            Contact us
                        </Text>
                    </Link>
                </Flex> */}
            </Box>
        </Box>
    );
};
export default ContactsBlock;
