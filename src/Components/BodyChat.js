import Message from './Message';

const BodyChat = ({ allMessages, refChat }) => {
    return (

        <div className='row'>
            <div className='chatbox five columns'>

                {allMessages.map((message, index) => {
                    return (<Message key={index} message={message} />)
                })

                }<div className='row' ref={refChat} />
            </div>
        </div>
    )
}

export default BodyChat;