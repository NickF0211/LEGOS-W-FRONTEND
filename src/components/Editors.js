import React, { useEffect, useState } from "react";

import {
    GridItem,
    Grid,
    Box,
    Center,
    Stack,
    Text,
} from '@chakra-ui/react';
import axios from "axios";
import { Buffer } from 'buffer';
import { defaultCompletions, defaultEditorsValue } from "./constants";
import FirstEditor from "./FirstEditor";
import SecondEditor from "./SecondEditor";
import ThirdEditor from "./ThirdEditor";
import OptionsBar from "./OptionsBar";
import Output from "./Output";

const initialState = {
    firstEditorInput:
        Buffer.from(defaultEditorsValue.firstDefault).toString("base64"),
    secondEditorInput:
        Buffer.from(defaultEditorsValue.secondDefault).toString("base64"),
    thirdEditorInput:
        Buffer.from(defaultEditorsValue.thirdDefault).toString("base64"),
    restart: false,
    boundaryCaseReduction: false,
    minSol: false,
    volume: 1,
};

function Editors({ isExample, example, setIsExample }) {
    const [sendValues, setSendValues] = useState(initialState)
    const [resValue, setResValue] = useState('');
    const [placeholderResValue, setPlaceholderResValue] = useState('');
    const [isDisabledOutput, setIsDisabledOutput] = useState(true)
    const [isErrorOutput, setIsErrorOutput] = useState(false)
    const [isOpenCard, setIsOpenCard] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [completionsValue, setCompletionsValue] = useState(defaultCompletions);
    const invalidInput = sendValues.volume < 0
    const isButtonDisabled = invalidInput || !sendValues.firstEditorInput || !sendValues.secondEditorInput || !sendValues.thirdEditorInput
    const [firstDefaultValue, setFirstDefaultValue] = useState(defaultEditorsValue.firstDefault)
    const [secondDefaultValue, setSecondDefaultValue] = useState(defaultEditorsValue.secondDefault)
    const [thirdDefaultValue, setThirdDefaultValue] = useState(defaultEditorsValue.thirdDefault)

    function myCompletions(context) {
        let before = context.matchBefore(/\w+/)
        if (!context.explicit && !before) return null
        return {
            from: before ? before.from : context.pos,
            options: completionsValue,
            validFor: /^\w*$/
        }
    }
    useEffect(() => {
        if (resValue === 'unsat' || resValue === 'bounded unsat') {
            setIsDisabledOutput(true)
            setIsErrorOutput(false)
            if (resValue === 'unsat') setPlaceholderResValue('unsat')
            if (resValue === 'bounded unsat') setPlaceholderResValue('bounded unsat')
        }
        if (resValue.indexOf('ERROR') !== -1) {
            setIsErrorOutput(true);
            setIsDisabledOutput(false);
            setPlaceholderResValue('Press to view an error message');
        }
        if (resValue.includes('timeout')) {
            setIsErrorOutput(true);
            setIsDisabledOutput(true);
            setPlaceholderResValue('Sorry, timeout (> 30 sec)');
        }
        if (resValue.length > 100 && resValue !== 'Please launch again' && resValue.indexOf('ERROR') === -1) {
            setIsDisabledOutput(false);
            setIsErrorOutput(false);
            setPlaceholderResValue('Please press to see output');
        }

    }, [resValue]);

    const foundValues = (val) => {
        var regexAction = /create_action\(\"(?<firstArg>.*?)\"(?:.*?)\[\s*(?<secondArg>.*?)\]/
        var regexType = /create_type\(\"(?<firstArg>.*?)\"(?:.*?)\[\s*(?<secondArg>.*?)\]/
        var regexPairAction = /create_pair_action\(\"(?<firstArg>.*?)\"(?:.*?)\[\s*(?<secondArg>.*?)\]/
        var arrItemRegex = /\s*\"(?:.*?)\"\s*\,\s*\"(.*?)\"\s*/
        var matchResult = val.match(regexAction) || val.match(regexType) || val.match(regexPairAction)
        var arg = matchResult?.groups.firstArg
        var arrArgs = matchResult?.groups.secondArg.split(/(?:\))\s*\,\s*\(/).map(item => item.match(arrItemRegex)?.[1])
        if (arg, arrArgs) {
            return { arg, arrArgs }
        }
        return
    }

    const handleFirstEditorChange = (value) => {
        var splitedInput = value.split('\n')
        var mappedInput = [].concat.apply([], splitedInput.map(item => foundValues(item)));
        var completionsObjRes = mappedInput.map(item => item && { 'label': item.arg, "type": "constant", "info": `${item.arg + '(' + item.arrArgs.toString() + ')'}` }).filter(Boolean)
        setCompletionsValue(defaultCompletions.concat(completionsObjRes))
        setSendValues(prevState => ({ ...prevState, firstEditorInput: Buffer.from(value).toString("base64") }))
        setIsDisabledOutput(true);
        setPlaceholderResValue(null);
        setIsErrorOutput(false);
        setResValue('');
        setIsOpenCard(false)
        setIsExample(value)
        setFirstDefaultValue(value)
    }

    const handleSecondEditorChange = (value) => {
        setSendValues(prevState => ({ ...prevState, secondEditorInput: Buffer.from(value).toString("base64") }))
        setIsDisabledOutput(true);
        setPlaceholderResValue(null);
        setIsErrorOutput(false);
        setResValue('');
        setIsOpenCard(false)
        setIsExample(value)
        setSecondDefaultValue(value)
    }

    const handleThirdEditorChange = (value) => {
        setSendValues(prevState => ({ ...prevState, thirdEditorInput: Buffer.from(value).toString("base64") }))
        setIsDisabledOutput(true);
        setPlaceholderResValue(null);
        setIsErrorOutput(false);
        setResValue('');
        setIsOpenCard(false)
        setIsExample(value)
        setThirdDefaultValue(value)
    }

    const sendRequest = () => {
        setIsLoading(true)
        const requestOptions = {
            method: 'POST',
            headers: { "content-type": "multipart/form-data" },
            body: JSON.stringify(sendValues),
            timeout: 1000 * 29, // Wait for 30 seconds
        };

        axios.post('https://legos2.herokuapp.com/compiler', requestOptions)
            // axios.post('http://127.0.0.1:5000/compiler', requestOptions)

            .then(function (response) {
                setResValue(response.data);
                setIsLoading(false)
            })
            .catch(error => {
                setResValue('timeout');
                setIsLoading(false)
            });
    }

    return (
        <Box>
            <Center mt="30px" >
                <Stack spacing="360px" direction='row'>
                    <Text
                        fontSize="1rem"
                        as="h2"
                        fontWeight="bold"
                    >
                        Domain
                    </Text>
                    <Text
                        fontSize="1rem"
                        as="h2"
                        fontWeight="bold"
                    >
                        Requirements
                    </Text>
                    <Text
                        fontSize="1rem"
                        as="h2"
                        fontWeight="bold"
                    >
                        Property
                    </Text>
                </Stack>
            </Center>
            <Center  >
                {isExample.isExampleBool && example ? (
                    <Grid templateColumns='repeat(3, 1fr)' gap={1} mt="15px" fontSize='12px' >
                        <GridItem w='80%' maxW="400px" borderWidth='1px' ml={10}>
                            < FirstEditor
                                myCompletions={myCompletions}
                                handleFirstEditorChange={handleFirstEditorChange}
                                firstDefaultValue={firstDefaultValue}
                                example={example.firstEditorInput}
                            />
                        </GridItem>
                        <GridItem w='90%' maxW="400px" borderWidth='1px' >
                            < SecondEditor
                                myCompletions={myCompletions}
                                handleSecondEditorChange={handleSecondEditorChange}
                                secondDefaultValue={secondDefaultValue}
                                example={example.secondEditorInput}
                            />
                        </GridItem>
                        <GridItem w='90%' maxW="400px" borderWidth='1px' >
                            < ThirdEditor
                                myCompletions={myCompletions}
                                handleThirdEditorChange={handleThirdEditorChange}
                                thirdDefaultValue={thirdDefaultValue}
                                example={example.thirdEditorInput}
                            />
                        </GridItem>
                    </Grid>) :
                    (<Grid templateColumns='repeat(3, 1fr)' gap={1} mt="15px" fontSize='12px' >
                        <GridItem w='80%' maxW="400px" borderWidth='1px' ml={10}>
                            < FirstEditor handleFirstEditorChange={handleFirstEditorChange} firstDefaultValue={firstDefaultValue} />
                        </GridItem>
                        <GridItem w='90%' maxW="400px" borderWidth='1px' >
                            < SecondEditor
                                myCompletions={myCompletions}
                                handleSecondEditorChange={handleSecondEditorChange}
                                secondDefaultValue={secondDefaultValue}
                            />
                        </GridItem>
                        <GridItem w='90%' maxW="400px" borderWidth='1px' >
                            < ThirdEditor
                                myCompletions={myCompletions}
                                handleThirdEditorChange={handleThirdEditorChange}
                                thirdDefaultValue={thirdDefaultValue}
                            />
                        </GridItem>
                    </Grid>)
                }  </Center>
            <OptionsBar
                setIsOpenCard={setIsOpenCard}
                setResValue={setResValue}
                setSendValues={setSendValues}
                sendValues={sendValues}
                sendRequest={sendRequest}
                invalidInput={invalidInput}
                isButtonDisabled={isButtonDisabled} />
            <Output
                text={resValue}
                placeholderResValue={placeholderResValue}
                isDisabled={isDisabledOutput}
                isError={isErrorOutput}
                isOpenCard={isOpenCard}
                setIsOpenCard={setIsOpenCard}
                isLoading={isLoading} />
        </Box>
    );
}

export default Editors;
