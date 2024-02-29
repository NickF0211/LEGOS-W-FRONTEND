import React from 'react';
import { Text, HStack, NumberInput, NumberInputField, NumberIncrementStepper, NumberInputStepper, NumberDecrementStepper, Box, Tooltip } from '@chakra-ui/react';
import Notification from './Notification';

function InputOption({ text, setSendValues, sendValues, invalidInput }) {

    return (<Box >
        <Tooltip
            fontSize='12px'
            placement='top'
            label="Put 0 for unbounded verification."
            aria-label='Volume tooltip'
            bg='gray.100' color='black'>
            <HStack spacing='24px' ml={100}>
                <Text fontSize='14px'>{text}</Text>
                <NumberInput
                    min={0}
                    ml={5}
                    width="100px"
                    defaultValue={0}
                    isInvalid={invalidInput}
                    onChange={(value) => setSendValues({ ...sendValues, volume: value })}
                    size='12px'>
                    <NumberInputField height="30px" />
                    <NumberInputStepper >
                        <NumberIncrementStepper height="15px" />
                        <NumberDecrementStepper height="50px" />
                    </NumberInputStepper>
                </NumberInput>
            </HStack >
        </Tooltip>
        {invalidInput ? <Notification infoText="Volume should starts from 0" /> : null}
    </Box>
    );
}

export default InputOption;
