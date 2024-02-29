
import { Text, Flex, Box, HStack } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronRightIcon } from '@chakra-ui/icons';
import CodeMirror from '@uiw/react-codemirror';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { Spinner } from '@chakra-ui/react'

function Output({
    text = 'You need to enter input first',
    placeholderResValue = 'You need to enter input first',
    isError = false,
    isDisabled = true,
    isOpenCard = false,
    setIsOpenCard = () => { },
    isLoading = false
}) {

    const openCard = () => { setIsOpenCard(!isOpenCard) }

    return (
        <> {isOpenCard
            ? <Flex ml="30px"
                h="100%"
                mb="30px"
                onClick={isDisabled ? () => { } : openCard}
                _hover={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                p={5} >
                <ChevronUpIcon w={7} h={6} color='#84CA03' />
                {/* </Circle> */}
                <Box>
                    <Text fontWeight={isDisabled ? '400' : '700'} fontSize="16px" mr="40px">
                        Result:
                    </Text>
                    {!text ?
                        null : <Box w='100%' mt="20px" fontSize='12px'>
                            <CodeMirror
                                value={text}
                                height="40vh"
                                width="90vh"
                                theme={sublime}
                            />

                        </Box>}
                </Box>
            </Flex > :
            <HStack
                ml="30px"
                h="100%"
                mb="30px"
                onClick={isDisabled ? () => { } : openCard}
                _hover={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                p={5}
                data-testid="accordion-title">
                <ChevronRightIcon w={7} h={6} color='#84CA03' />
                <HStack>
                    <Text fontWeight={isDisabled ? '400' : '700'} fontSize="16px" mr="40px">
                        Result:
                    </Text>
                    {isLoading ?
                        <Spinner />
                        : (<Text fontSize="16px">
                            {placeholderResValue}
                        </Text>)
                    }
                </HStack>
            </HStack>}</>
    );
}

export default Output;
