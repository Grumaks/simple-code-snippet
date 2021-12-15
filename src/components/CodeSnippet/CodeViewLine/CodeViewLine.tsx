import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/cjs/styles/hljs/docco';

import './styles.scss';

interface CodeViewLineProps {
    lineNumber: number;
    content: string;
    language: string;
}

const styles = {
    padding: undefined,
    background: undefined,
    overflow: undefined
};

const CodeViewLine = (props: CodeViewLineProps): JSX.Element => {

    const { lineNumber, content, language } = props;

    return (
        <tr className='code-view-line'>
            <td className='line-number' data-line-number={lineNumber}></td>
            <td className='code'>
                {/* eslint-disable-next-line */}
                <SyntaxHighlighter customStyle={styles} language={language.toLocaleLowerCase()} style={docco}>{content}</SyntaxHighlighter>
            </td>
        </tr>
    );
};

export default React.memo(CodeViewLine);
