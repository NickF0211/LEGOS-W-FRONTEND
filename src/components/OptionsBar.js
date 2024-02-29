import { Text, Stack, Button, Center } from '@chakra-ui/react';
import InputOption from './InputOption';
import RadioOption from './RadioOption';

function OptionsBar({ setSendValues, sendValues, sendRequest, invalidInput, isButtonDisabled, setIsOpenCard, setResValue }) {

    return (
        <Center mt="2px" h={40}>
            <Stack spacing={12} direction='row'>
                <Text ml={30} mt="10px" fontSize="14px" fontWeight="bold">Options:</Text>
                <RadioOption text='restart' setSendValues={setSendValues} sendValues={sendValues} />
                <RadioOption text='boundary case reduction' setSendValues={setSendValues} sendValues={sendValues} />
                <RadioOption text='optimal solution' setSendValues={setSendValues} sendValues={sendValues} />
                <InputOption text='volume' setSendValues={setSendValues} sendValues={sendValues} invalidInput={invalidInput} />
                <Button w={44} h={9} colorScheme='blue' onClick={() => { sendRequest(); setIsOpenCard(false); setResValue('') }} isDisabled={isButtonDisabled} >Launch</Button>
            </Stack>
        </Center>
    );
}

export default OptionsBar;
