import { Text, Divider, Flex, Box, Spacer, VStack, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from "@chakra-ui/icons";
import EditorsBox from '../components/EditorsBox';
import ContactsBlock from '../components/ContactsBlock';
import HeaderSection from '../components/HeaderSection';

function Info() {

    return (
        <>
            <HeaderSection>
                <Divider size="14px" />
            </HeaderSection>
            <Flex
                flexGrow={1}
                alignItems={'center'}
                bgColor="#2C5282">
                <Box flex="1 1 100%" mb={27} mt={27}>
                    <Flex
                        flexDir="column"
                        overflow="hidden"
                        flex={1}
                        height="100%"
                        width="100%"
                        pl={15}
                        pr={15}>
                        <Flex flexDir="row">
                            <Spacer></Spacer>
                        </Flex>
                        <EditorsBox>
                            <VStack
                                spacing={4}
                                align='stretch'
                                ml={400}
                                mt={58}
                            >
                                <Box h='80px' >
                                    <Text
                                        fontWeight="bold"
                                        fontSize="1rem"
                                        as="h2"
                                    >Contact</Text>
                                </Box>
                                <Box h='40px'>
                                    <Text ml={28} fontSize="0.8rem">Nick Feng       nick.feng@mail.utoronto.ca
                                        <Link href='http://www.cs.toronto.edu/~fengnick/' isExternal>
                                            <ExternalLinkIcon mx='2px' />
                                        </Link>
                                    </Text>
                                </Box>
                                <Box h='40px'>
                                    <Text ml={28} fontSize="0.8rem">Lina Marsso     lina.marsso@utoronto.ca
                                        <Link href='http://www.cs.toronto.edu/~lmarsso/' isExternal>
                                            <ExternalLinkIcon mx='2px' />
                                        </Link>
                                    </Text>
                                </Box>
                                <Box h='40px'>
                                    <Text ml={28} fontSize="0.8rem">Marsha Chechik     chechik@cs.toronto.edu
                                        <Link href='http://www.cs.toronto.edu/~chechik/' isExternal>
                                            <ExternalLinkIcon mx='2px' />
                                        </Link>
                                    </Text>
                                </Box>
                                <Box h='40px'>
                                    <Text ml={28} fontSize="0.8rem">Web interface designed by       Yulia Kholodetska</Text>
                                </Box>
                            </VStack>
                            <Box h='176px' />
                        </EditorsBox>
                    </Flex>
                </Box>
            </Flex >
            <ContactsBlock />
        </>

    );
}

export default Info;
