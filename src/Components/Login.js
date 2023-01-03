const Login = ({ setUserName, setRoom, joinRoom, allRooms, room, setSelectedRoom, selectedRoom }) => {


    const getRoomOptions = () => {
        return (allRooms.map((value, key) => {
            return <option key={key} value={value}>Room:{value} </option>
        }));
    }

    return (

        <div className="" >
            <div className="row ">
                <label >User Name </label>
                <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Enter user name..." />
            </div>
            <div className="row ">
                <label >Room Name </label>
                <div>
                    <input className="enterRoom" onChange={(e) => setRoom(e.target.value)} type="text" placeholder="Enter room..." disabled={selectedRoom !== 'roomNotValid'} />
                    <select onChange={(e) => {
                        setSelectedRoom(e.target.value);
                        setRoom(e.target.value);
                    }}>
                        <option value="roomNotValid">Join new Room...</option>
                        {getRoomOptions()}
                    </select>
                </div>
            </div>
            <div className="row">
                <label > </label>
                <button onClick={joinRoom} className="button-primary">Join Room</button>
            </div>
        </div >
    )
}

export default Login;