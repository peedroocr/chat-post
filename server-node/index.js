const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

var bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser());
app.use(bodyParser.json());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        methods: ['GET', 'POST']
    }
});


//socket functionality
io.on('connection', (socket) => {

    socket.on('join_room', (data) => {
        console.log(data);
        socket.join(data);
        io.sockets.emit('new_room', data);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit('receive_message', data);
    })

    socket.on('get_rooms', () => {
        let allRoomsConnected = {};
        for (let [key, value] of io.of('/').adapter.rooms) {
            const clients = io.sockets.adapter.rooms.get(key);
            for (const clientId of clients) {
                clientId === key || allRoomsConnected[key] == key ? null : allRoomsConnected[key] = key;
            }
        }

        socket.emit('send_rooms', allRoomsConnected);
    });

});

io.on('disconnection', (socket) => {
    console.log('id disonnected: ', socket.id);
});




//Get information from database functionality
app.get("/allPosts", async (req, resp) => {
    mongoose.connect("mongodb://localhost:27017/allPosts", {}).then(() => console.log('CONECTADO A MONGO'));
    let ShopModel;
    if (mongoose.models.posts) {
        ShopModel = mongoose.models.posts
    }
    else {
        ShopModel = mongoose.model('posts', {
            id: String,
            title: String,
            description: String,
            author: String
        });
    }
    await ShopModel.find({}, (err, postItems) => {
        resp.send(postItems)
    }).clone().catch(function (err) { console.log(err) });

});


app.post("/newPost", async (req, resp) => {

    mongoose.connect("mongodb://localhost:27017/allPosts", {}).then(() => console.log('CONECTADO A MONGO'));
    let ShopModel;
    if (mongoose.models.posts) {
        ShopModel = mongoose.models.posts
    }
    else {
        ShopModel = mongoose.model('posts', {
            id: String,
            title: String,
            description: String,
            author: String
        });
    }

    const myData = ShopModel(req.body);
    myData.save();

    resp.send({ ok: 'OK' })
});

app.post("/updatePost", async (req, resp) => {

    mongoose.connect("mongodb://localhost:27017/allPosts", {}).then(() => console.log('CONECTADO A MONGO'));
    let ShopModel;
    if (mongoose.models.posts) {
        ShopModel = mongoose.models.posts
    }
    else {
        ShopModel = mongoose.model('posts', {
            id: String,
            title: String,
            description: String,
            author: String
        });
    }
    const postToUpdate = await ShopModel.findOne({ 'id': req.body.id }).exec();
    postToUpdate.title = req.body.title;
    postToUpdate.author = req.body.author;
    postToUpdate.description = req.body.description;
    postToUpdate.save();
    resp.send({ ok: 'OK' })

})

server.listen(3101, () => {
    console.log('Server Running')
});

