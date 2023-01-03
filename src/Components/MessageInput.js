const MessageInput = ({ setCurrentMessage, sendMessage, refInputMessage }) => {
    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {

            sendMessage();
        }
    }

    return (
        <div>
            <input onChange={(e) => setCurrentMessage(e.target.value)} onKeyDown={_handleKeyDown} ref={refInputMessage} placeholder="Enter Message..." />
            <button className="button-primary" onClick={sendMessage}>Send Message</button>
        </div>)
}

export default MessageInput