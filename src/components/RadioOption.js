import React from 'react';
import { Flex, Checkbox } from '@chakra-ui/react';


function RadioOption({ text, setSendValues, sendValues }) {
    const defineObject = (text, e) => {
        if (text === 'restart') {
            return { ...sendValues, restart: e.target.checked }
        }
        if (text === 'boundary case reduction') {
            return { ...sendValues, boundaryCaseReduction: e.target.checked }
        }
        if (text === 'optimal solution') {
            return { ...sendValues, minSol: e.target.checked }
        }
    };

    return (
        <Flex>
            <Checkbox onChange={(e) => setSendValues(defineObject(text, e))}>{text}</Checkbox>
        </Flex >
    );
}

export default RadioOption;
