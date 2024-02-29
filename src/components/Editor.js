import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { autocompletion } from "@codemirror/autocomplete"
import { sublime } from '@uiw/codemirror-theme-sublime';
import { languages } from '@codemirror/language-data';
import { python } from '@codemirror/lang-python';

function Editor({ onOpen, value, onChange, myCompletions }) {
    return (
        <CodeMirror
            onClick={onOpen ? onOpen : () => { }}
            value={value}
            height="40vh"
            fontSize="30px"
            extensions={[
                autocompletion({ override: [myCompletions] }), python({ base: python, codeLanguages: languages })
            ]
            }
            options={{
                tabSize: 2,
                lint: true,
                lineNumbers: true,
                lineWrapping: true,
                spellcheck: true,
                autoCloseTags: true,
                autoCloseBrackets: true,
                matchTags: true,
                matchBrackets: true
            }}
            theme={sublime}
            overflow="auto"
            onChange={onChange}
        />
    )
}

export default Editor;
