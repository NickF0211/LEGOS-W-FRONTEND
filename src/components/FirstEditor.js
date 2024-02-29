import React from "react";
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    Button,
    ModalBody

} from '@chakra-ui/react';

import Editor from "./Editor";

function FirstEditor({ handleFirstEditorChange, firstDefaultValue, myCompletions, example }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box>
            {example ? (
                <Box>
                    <Editor
                        onOpen={onOpen}
                        value={example}
                        onChange={handleFirstEditorChange}
                        myCompletions={myCompletions} />
                    <Modal isOpen={isOpen} onClose={onClose} >
                        <ModalOverlay
                            bg='none'
                            backdropFilter='auto'
                            backdropInvert='10%'
                            backdropBlur='2px' />
                        <ModalContent maxH="600" maxW="800" fontSize='12px'>
                            <ModalHeader>Domain</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody >
                                <Editor
                                    value={example}
                                    onChange={handleFirstEditorChange}
                                    myCompletions={myCompletions} />
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={() => { onClose() }}>
                                    Finish editing
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>

            ) :
                <Box>
                    <Editor
                        onOpen={onOpen}
                        value={firstDefaultValue}
                        onChange={handleFirstEditorChange}
                        myCompletions={myCompletions} />
                    <Modal isOpen={isOpen} onClose={onClose} >
                        <ModalOverlay
                            bg='none'
                            backdropFilter='auto'
                            backdropInvert='10%'
                            backdropBlur='2px' />
                        <ModalContent maxH="600" maxW="800" fontSize='12px'>
                            <ModalHeader>Domain</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody >
                                <Editor
                                    value={firstDefaultValue}
                                    onChange={handleFirstEditorChange}
                                    myCompletions={myCompletions} />
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={() => { onClose() }}>
                                    Finish editing
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            } </Box>
    );
}

export default FirstEditor;
