import * as React from 'react';
import { getFileContent } from '../../api/contentApi';
import createError from '../../utils/createError';
import { CodeView } from './CodeView';
import { Error } from '../Error';
import logError from '../../utils/errorLogger';
import { CodeSnippetHeader } from './CodeSnippetHeader';
import splitStringNewLines from '../../utils/splitStringNewLines';
import copyToClipboard from '../../utils/copyToClipboard';

import './styles.scss';

export interface CodeSnippetProps {
    artifactLocation: {
        owner: string;
        repo: string;
        path: string;
        ref?: string
    };
    startLine: number;
    content: string[];
    language: string;
}

const addLinesStep = 5;

const CodeSnippet = (props: CodeSnippetProps): JSX.Element => {
    const { artifactLocation, language } = props;

    const [content, setContent] = React.useState(() => {
        const arr: string[] = [];

        for (let i = 0; i < props.content.length; i++) {
            arr[props.startLine + i - 1] = props.content[i];
        }

        return arr;
    });
    const [rawContent, setRawContent] = React.useState<string | null>(null);
    const [startLine, setStartLine] = React.useState(props.startLine);
    const [endLine, setEndLine] = React.useState(props.startLine + props.content.length - 1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isContentLoaded, setIsContentLoaded] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const loadContent = async () => {
        try {
            setIsLoading(true);

            const loadedContent = await getFileContent(
                artifactLocation.owner,
                artifactLocation.repo,
                artifactLocation.path,
                artifactLocation.ref
            );

            setRawContent(loadedContent);
            setContent(splitStringNewLines(loadedContent));
            setIsContentLoaded(true);

            setIsLoading(false);
        }
        catch (e) {
            const err = createError(e);
            setError(err);
            logError(err);
        }
    };

    const handlePrevLines = (): void => {
        const newStartLine = startLine - addLinesStep;
        setStartLine(newStartLine < 1 ? 1 : newStartLine);
    };

    const handleNextLines = (): void => {
        const newEndLine = endLine + addLinesStep;
        setEndLine(newEndLine > content.length ? content.length : newEndLine);
    };

    const handleShowAll = React.useCallback(() => {
        setStartLine(1);
        setEndLine(content.length);
    }, [content]);

    const handleCopyAll = React.useCallback(() => {
        if (rawContent) {
            copyToClipboard(rawContent);
        }
    }, [rawContent]);

    if (error) {
        return <Error />;
    }

    return (
        <div className='code-snippet'>
            <CodeSnippetHeader
                {...artifactLocation}
                reference={artifactLocation.ref}
                showButtons={isContentLoaded}
                showAll={handleShowAll}
                copyAll={handleCopyAll}
            />
            { startLine > 1 && isContentLoaded &&
                <button className='full-width-button' onClick={handlePrevLines}>
                    {`${addLinesStep} строками ранее...`}
                </button>
            }
            <CodeView
                startLine={startLine}
                endLine={endLine}
                content={content}
                language={language}
            />
            { endLine < content.length && isContentLoaded &&
                <button className='full-width-button' onClick={handleNextLines}>
                    {`${addLinesStep} строк спустя...`}
                </button>
            }
            { !isContentLoaded &&
                <button className='full-width-button' onClick={loadContent} data-marker='loadcontent'>
                    { !isLoading ? 'Догрузить файл' : 'Загрузка...' }
                </button>
            }
        </div>
    );
};

export default CodeSnippet;
