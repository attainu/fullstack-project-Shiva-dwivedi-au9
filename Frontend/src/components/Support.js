import React from 'react'
import { ChatEngine } from 'react-chat-engine'
import "./Support.css"
import ChatFeed from './Support/ChatFeed'
import LoginForm from './Support/LoginForm'

const projectID = '2ba69b22-15f7-46a2-a34b-fe162d9e36a8';

function Support() {
    if (!localStorage.getItem('username')) return <LoginForm />;

  return (
    <ChatEngine
      height="88vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
}

export default Support
