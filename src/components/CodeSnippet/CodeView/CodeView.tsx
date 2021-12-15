import * as React from 'react';
import { CodeViewLine } from '../CodeViewLine';
import './styles.scss';

interface CodeViewProps {
    startLine: number;
    endLine: number;
    content: string[];
    language: string;
}

const CodeView  = (props: CodeViewProps): JSX.Element => {

    const { startLine, endLine, content, language } = props;

    return (
        <div className='code-view'>
            <table className='content'>
                <tbody>
                    {content.map(
                        (codeLine, index) => (
                            (index >= startLine - 1 && index <= endLine - 1) &&
                            <CodeViewLine
                                key={ index }
                                content={codeLine}
                                language={language}
                                lineNumber={index + 1}
                            />
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CodeView;
