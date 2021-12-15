export default function createError(error: unknown): Error {
    if (error instanceof Error) {
        return error;
    }

    // eslint-disable-next-line
    return new Error(error as  any);
}
