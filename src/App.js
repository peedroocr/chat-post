import './skeleton.css';
import './App.css';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import Login from './Components/Login';
import Chat from './Components/Chat';
import NavigationMenu from './Components/NavigationMenu';
import ShowPosts from './Components/ShowPosts';
import UploadPost from './Components/UploadPost';
import EditPost from './Components/EditPost';

import { selectAllPosts, selectStatus, fetchPosts } from './features/posts/postsSlice';
import { useSelector, useDispatch } from 'react-redux';


const socket = io.connect("http://162.19.66.62:3101");


const App = () => {
    const dispatch = useDispatch();

    const allSelectedPosts = useSelector(selectAllPosts);
    const statusPost = useSelector(selectStatus);


    const refChat = useRef();
    const refInputMessage = useRef(null);
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('roomNotValid');
    const [userJoinRoom, setUserJoinRoom] = useState({ userName: '', room: '' });
    const [currentMessage, setCurrentMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const navigate = useNavigate();
    const [itemMenu, setItemMenu] = useState(0);
    const [allRooms, setAllRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('roomNotValid');





    useEffect(() => {
        if (statusPost === 'idle') {
            dispatch(fetchPosts());
        }
    }, [statusPost, dispatch])

    const joinRoom = () => {
        if (userName !== '' && room !== 'roomNotValid' && room !== '') {
            setUserJoinRoom({ userName: userName, room: room });
            socket.emit('join_room', room);

        } else {
            console.log('Empty fields!!')
        };
    }

    const sendMessage = () => {
        if (currentMessage !== "") {
            const messageData = {
                room: userJoinRoom.room,
                author: userJoinRoom.userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds()
            }
            setAllMessages((listMessages) => [...listMessages, messageData]);
            socket.emit('send_message', messageData);
            refInputMessage.current.value = '';
            scrollDown();
            setCurrentMessage('');
        }
    }

    const scrollDown = () => refChat.current?.scrollIntoView({ behavior: 'smooth' })


    useEffect(() => {
        const getAllRooms = async () => {
            await socket.emit('get_rooms', '');
        }
        getAllRooms();
    }, [])


    useEffect(() => {
        scrollDown();
    }, [allMessages])

    useEffect(() => {
        socket.on('receive_message', data => {
            setAllMessages((listMessages) => [...listMessages, data]);
        });

        socket.on('send_rooms', data => {
            let a = [];
            for (let i in data) {
                a.push(i);
            }
            setAllRooms(a);
        });

        socket.on('new_room', data => {
            setAllRooms((allRoomsSaved) => [...allRoomsSaved, data]
            )
        });
    }, [socket])


    return (
        <div>
            <NavigationMenu
                navigate={navigate}
                userName={userJoinRoom.userName}
                itemMenu={itemMenu}
                setItemMenu={setItemMenu} />
            <Routes>
                <Route path={'/'} exact element={userJoinRoom.userName === '' ?
                    <Login
                        setUserName={setUserName}
                        setRoom={setRoom}
                        joinRoom={joinRoom}
                        allRooms={allRooms}
                        room={room}
                        selectedRoom={selectedRoom}
                        setSelectedRoom={setSelectedRoom} /> :
                    <ShowPosts allPosts={allSelectedPosts}
                        navigate={navigate} />} />
                <Route path={'/Chat'} exact element={userJoinRoom.room !== '' || userJoinRoom.userName !== '' ?
                    <Chat
                        setCurrentMessage={setCurrentMessage}
                        sendMessage={sendMessage}
                        allMessages={allMessages}
                        refInputMessage={refInputMessage}
                        refChat={refChat}
                        room={room} /> :
                    <Navigate to="/" />} />

                <Route path={'/UploaPost'} exact element={userJoinRoom.room !== '' || userJoinRoom.userName !== '' ?
                    <UploadPost
                        userJoinRoom={userJoinRoom}
                        setCurrentMessage={setCurrentMessage}
                        sendMessage={sendMessage}
                        allMessages={allMessages}
                        refInputMessage={refInputMessage} /> :
                    <Navigate to="/" />} />
                <Route path={'/editPost'} exact element={userJoinRoom.room !== '' || userJoinRoom.userName !== '' ?
                    <EditPost
                        navigate={navigate} /> :
                    <Navigate to="/" />} />
            </Routes>
        </div>);
}

export default App;
