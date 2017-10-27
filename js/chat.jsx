import React from 'react';

import {Well, FormGroup, InputGroup, FormControl, Jumbotron, Row, Col, Grid} from 'react-bootstrap';
import {subscribeToChatEvents, subscribeToUserEvents, emitNewChat, emitAddedUser} from './socket';

class ChatMessage extends React.Component {
    render() {
        const {chat: {username, message, isSystemMessage}} = this.props;
        return <Row>
            <Col xs={3}><span style={{fontWeight: 'bold'}}>{isSystemMessage ? 'System' : username}:</span></Col>
            <Col><div style={{textAlign: 'left', fontStyle: isSystemMessage ? 'italic': ''}}>{message}</div></Col>
        </Row>;
    }
}

class ChatInput extends React.Component {
    state = {
        message: ''
    }
    render() {
        const {username} = this.props;
        const {message} = this.state;
        return <FormGroup>
            <InputGroup>
                <InputGroup.Addon>{username}</InputGroup.Addon>
                <FormControl autoFocus={true} type="text" value={message} onKeyPress={this.onKeyPress} onChange={this.onChange}/>
            </InputGroup>
        </FormGroup>;
    }
    onChange = event => this.setState({message: event.target.value})
    onKeyPress = event => {
        if (event.key === 'Enter') {
            const {message} = this.state;
            if (message) {
                const {username, onNewChat} = this.props;
                const chat = {username, message};
                onNewChat(chat);
                this.setState({message: ''});
            }
        }
    }
}

class ChatRoom extends React.Component {
    state = {
        chats: [],
        usersInChat: []
    }
    constructor(props) {
        super(props);
        subscribeToChatEvents(chat => this.onChatEvent(chat));
        subscribeToUserEvents(usersInChat => this.setState({usersInChat}));
    }
    render() {
        const {username} = this.props;
        const {chats, usersInChat} = this.state;
        return <div>
            <Well>
                <Grid>
                    {chats.length === 0 && <Row><Col>No Chats!</Col></Row>}
                    {chats.map(chat => <ChatMessage chat={chat}/>)}
                </Grid>
            </Well>
            <ChatInput username={username} onNewChat={this.onNewChat}/>
            <div>Users in the chat: {usersInChat.join(', ')}</div>
        </div>;
    }
    onChatEvent = chat => {
        this.updateChats(chat);
    }
    onNewChat = chat => {
        this.updateChats(chat);
        emitNewChat(chat);
    }
    updateChats = chat => {
        const {chats} = this.state;
        chats.push(chat);
        this.setState({chats});
    }
}

class UsernameSelect extends React.Component {
    state = {
        value: ''
    }
    render() {
        const {value} = this.state;
        return <FormGroup>
            <InputGroup>
                <InputGroup.Addon>Enter your username</InputGroup.Addon>
                <FormControl autoFocus={true} type="text" value={value} onKeyPress={this.onKeyPress} onChange={this.onChange}/>
            </InputGroup>
        </FormGroup>;
    }
    onChange = event => this.setState({value: event.target.value})
    onKeyPress = event => {
        if (event.key === 'Enter') {
            const {value} = this.state;
            if (value) {
                const {onUsernameSelect} = this.props;
                onUsernameSelect(value);
            }
        }
    }
}

export default class ChatroomEntry extends React.Component {
    state = {
        username: ''
    }
    render() {
        const {username} = this.state;
        return <Grid> 
            <Row>
                <Col>
                    <Jumbotron>
                        {username && <ChatRoom username={username}/>}
                        {!username && <UsernameSelect onUsernameSelect={this.onUsernameSelect}/>}
                    </Jumbotron>
                </Col>
            </Row>
        </Grid>;
    }
    onUsernameSelect = username => {
        this.setState({username});
        emitAddedUser(username);
    }
}