// @flow
import React, { Component, type Element } from 'react';
import {
    Container,
    Header,
    Icon,
    Menu,
    Segment,
    Input
} from 'semantic-ui-react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';

import { getStarredRepos } from 'repos/ducks';
import { isLoading } from 'ui/selectors';

const StyledSegment = glamorous(Segment)({
    minHeight: '15em',
    padding: '0em 0em',
    margin: '0 0 0 0'
});

type Props = {
    title: string,
    placeholder?: string,
    dispatch: Dispatch,
    loading: boolean
};

class AppHeader extends Component<Props>{
    static defaultProps = {
        placeholder: null
    };

    state = {
        username: null
    }

    handleKeyPress = (event: Event) => {
        const { username } = this.state;

        if(event.key !== 'Enter' || ! username)
            return;

        this.props.dispatch(getStarredRepos(username));
    }

    handleChange = (_: any, data: Object) => {
        this.setState(
            // @todo: sanitize username to alphanumeric
            () => ({ username: data.value })
        );
    }

    render(): Element<'header'>{
        const { title, placeholder, loading } = this.props;

        return (
            <header>
                <StyledSegment inverted textAlign='center' vertical>
                    <Menu inverted secondary fixed={null} size='small'>
                        <Container>
                            <Menu.Item>OSF</Menu.Item>
                            <Menu.Item position='right'>
                                <a href="#" title="View on GitHub"><Icon name="github" size="big" /></a>
                            </Menu.Item>
                        </Container>
                    </Menu>

                    <Container text>
                        <Header inverted as="h2">{ title }</Header>
                        <Input
                            icon="users"
                            fluid
                            action='Go'
                            inverted
                            onKeyPress={ this.handleKeyPress }
                            onChange={ this.handleChange }
                            placeholder={ placeholder }
                            iconPosition='left'
                            loading={loading}
                        />
                    </Container>
                </StyledSegment>
            </header>
        );
    }
}

const mapStateToProps = (state: Object) => ({
    loading: isLoading(state)
});

// $FlowFixMe
export default connect(mapStateToProps)(AppHeader);
