import { useEffect } from 'react';
import { useState } from 'react';
import { secondEditorPHIM, thirdEditorPHIM, firstEditorPHIM, firstEditorBacking, secondEditorBacking, thirdEditorBacking } from '../components/constants';
import Editors from '../components/Editors';
import EditorsBox from '../components/EditorsBox';
import Mockup from '../components/Mockup';

const PHIMExampleState = {
    firstEditorInput: firstEditorPHIM,
    secondEditorInput: secondEditorPHIM,
    thirdEditorInput: thirdEditorPHIM
};

const backingExampleState = {
    firstEditorInput: firstEditorBacking,
    secondEditorInput: secondEditorBacking,
    thirdEditorInput: thirdEditorBacking
};

const letExampleState = {
    firstEditorInput: 'let1',
    secondEditorInput: 'let2',
    thirdEditorInput: 'let3'
};

const isExampleInitialState = {
    isExampleBool: false,
    type: ''
}

function Compiler() {
    const [isExample, setIsExample] = useState(isExampleInitialState)
    const [example, setExample] = useState(null)
    useEffect(() => {
        if (isExample.type === 'let') {
            setExample(letExampleState)
        }
        if (isExample.type === 'PHIM') {
            setExample(PHIMExampleState)
        }
        if (isExample.type === 'Backing ') {
            setExample(backingExampleState)
        }
    }, [isExample]);

    return (
        <Mockup setIsExample={setIsExample}>
            <EditorsBox>
                <Editors setIsExample={setIsExample} isExample={isExample} example={example} />
            </EditorsBox>
        </Mockup>
    );
}

export default Compiler;
