import * as React from 'react';

import './styles.scss';

export interface CodeSnippetHeaderProps {
    owner: string;
    repo: string;
    path: string;
    reference?: string
    showAll: () => void;
    copyAll: () => void;
    showButtons: boolean;
}

const CodeSnippetHeader = (props: CodeSnippetHeaderProps): JSX.Element => {

    const { owner, repo, path, reference, showAll, copyAll, showButtons } = props;

    // если в репозитории не master, а main, github сам сделает редирект
    const originalFileUrl =
        `https://github.com/${owner}/${repo}/blob/${reference ?? 'master'}/${path}`;
    const fileName = path.substr(path.lastIndexOf('/') + 1);

    return (
        <div className='code-snippet-header'>
            <a href={originalFileUrl} target='_blank' rel="noreferrer">{fileName}</a>
            { showButtons &&
                <>
                    <button className='code-snippet-header-button right' onClick={showAll} data-marker='showall'>Показать все</button>
                    <button className='code-snippet-header-button' onClick={copyAll}>Копировать все</button>
                </>
            }
        </div>
    );
};

export default React.memo(CodeSnippetHeader);

