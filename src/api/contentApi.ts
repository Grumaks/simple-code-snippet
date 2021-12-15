import { HTTPTransport } from '../utils/http';
import { GIT_API_URL } from './constants';

const http = new HTTPTransport(GIT_API_URL);

export const getFileContent = async (owner: string, repo: string, path: string, ref?: string): Promise<string> => {
    const result = await http.get<string>(
        `/repos/${owner}/${repo}/contents/${path}${ref ? '?ref=' + ref : ''}`,
        {
            headers: {
                Accept: 'application/vnd.github.VERSION.raw'
            }
        }
    );

    return result;
};
