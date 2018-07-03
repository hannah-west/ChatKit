import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
         const chatManager = new Chatkit.ChatManager({
             instanceLocator,
             userId: 'hannahwest',
             tokenProvider: new Chatkit.TokenProvider({
                 url: tokenUrl
             })
         })

  chatManager.connect()
  .then(currentUser => {
     currentUser.subscribeToRoom({
         roomId: 10832282, /** swap out */
         hooks: {
             onNewMessage: message => {
                 console.log('message.text: ', message.text);
                 this.setState({
                   messages: [...this.state.messages, message]
                 })
             }
         }
     })
 })
}

  render() {
    return (
      <div className="App">
        <RoomList />
        <MessageList messages={this.state.messages}/>
        <SendMessagForm />
        <NewRoomForm />
      </div>
    )
  }
}
extend default App
