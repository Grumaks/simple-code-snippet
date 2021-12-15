const separator = '\n';

const splitStringNewLines = (value: string): string[] => {
    const result: string[] = [];

    while (value) {
        const separatorIndex = value.indexOf(separator);

        if (separatorIndex !== -1) {
            const isEmptyLine = separatorIndex === 0;

            const endOfLine = separatorIndex + (isEmptyLine ? separator.length : 0);

            result.push(isEmptyLine ? '\r' : value.substring(0, endOfLine));

            value = value.substr(endOfLine + (isEmptyLine ? 0 : separator.length));
        }
        else {
            result.push(value);
            value = '';
        }
    }

    return result;
};

export default splitStringNewLines;
