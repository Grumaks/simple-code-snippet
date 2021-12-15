import * as React from'react';
import { mount } from 'enzyme';
import { CodeSnippetHeaderProps } from '../CodeSnippetHeader';
import { CodeSnippetHeader } from '..';

const showAllMock = jest.fn();
const copyAllMock = jest.fn();

const props: CodeSnippetHeaderProps = {
    owner: 'test',
    repo: 'test',
    path: 'test',
    reference: undefined,
    showAll: showAllMock,
    copyAll: copyAllMock,
    showButtons: true
};

describe('Test CodeSnippetHeader component', () => {

    const getComponent = (props: CodeSnippetHeaderProps) => {
        return <CodeSnippetHeader {...props}/>;
    };

    it('Should render correctly', () => {
        const wrapper = mount(
            getComponent(props)
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('Should call copyAll hadler when click on copyAll button', () => {
        const wrapper = mount(
            getComponent(props)
        );

        const button = wrapper.find('[data-marker="showall"]').first();
        button.simulate('click');

        expect(showAllMock).toHaveBeenCalledTimes(1);
    });
});
