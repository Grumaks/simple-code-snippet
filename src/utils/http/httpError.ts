export default class HttpError extends Error {
    constructor(statusText: string, code: number, response: unknown) {
        super(statusText);

        this.code = code;
        this.response = response;
    }

    code: number;
    response: unknown;
}
