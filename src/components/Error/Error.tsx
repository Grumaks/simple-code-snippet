import * as React from 'react';

interface ErrorProps {
    message?: string;
}

const defaultErrorMessage = 'Если будет не лень, мы это починим. Приходите через полгода.';

const Error = ({ message = defaultErrorMessage }: ErrorProps): JSX.Element => {
    return (
        <div>
            {message}
        </div>
    );
};

export default Error;
