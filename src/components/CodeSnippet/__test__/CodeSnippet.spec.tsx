import * as React from'react';
import { mount, ReactWrapper } from 'enzyme';
import { CodeSnippet, CodeSnippetProps } from '..';
import * as API from '../../../api/contentApi';
import { act } from 'react-dom/test-utils';

jest.mock('../../../api/contentApi');

const getFileContentMock = jest.spyOn(API, 'getFileContent');

const props: CodeSnippetProps = {
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

describe('Test CodeSnippet component', () => {

    const getComponent = (props: CodeSnippetProps) => {
        return <CodeSnippet {...props}/>;
    };

    it('Should render correctly', () => {
        let wrapper;
        act(() => {
            wrapper = mount(
                getComponent(props)
            );
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('Should call API method when click on load content button', async () => {

        // eslint-disable-next-line
        let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
        //eslint-disable-next-line @typescript-eslint/require-await
        await act(async () => {
            wrapper = mount(
                getComponent(props)
            );
        });

        //eslint-disable-next-line @typescript-eslint/require-await
        await act(async () => {
            const button = wrapper?.find('[data-marker="loadcontent"]').first();
            button?.simulate('click');
        });

        expect(getFileContentMock).toHaveBeenCalledWith(
            props.artifactLocation.owner,
            props.artifactLocation.repo,
            props.artifactLocation.path,
            props.artifactLocation.ref
        );
    });
});
