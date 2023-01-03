
import MessageInput from './MessageInput'

import BodyChat from './BodyChat'
const Chat = ({ setCurrentMessage, sendMessage, allMessages, refInputMessage, refChat, room }) => {

    return (
        <div className="row">

            <div className="ten columns">
                <label> Chat with Room: {room}</label>
                <BodyChat allMessages={allMessages} refChat={refChat} />
                <MessageInput setCurrentMessage={setCurrentMessage} refInputMessage={refInputMessage} sendMessage={sendMessage} refChat={refChat} />
            </div>
        </div>
    )
}

export default Chat;