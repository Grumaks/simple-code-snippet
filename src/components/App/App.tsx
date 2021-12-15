import * as React from 'react';
import { CodeSnippet, CodeSnippetProps } from '../CodeSnippet';

// мб стоило бы сделать гуи для ввода этих параметров, но время не бесконечно :)
const inputData: CodeSnippetProps = {
    artifactLocation: {
        owner: 'JetBrains',
        repo: 'ring-ui',
        path: 'components/alert-service/alert-service.js'
    },
    startLine: 83,
    content: [
        ' sameAlert.isShaking = true;',
        ' this.renderAlerts();',
        ' this.stopShakingWhenAnimationDone(sameAlert);'
    ],
    language: 'JavaScript'
};


const App = (): JSX.Element => {
    return (
        <CodeSnippet { ...inputData } />
    );
};

export default App;
