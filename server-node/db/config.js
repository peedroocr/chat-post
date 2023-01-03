const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/TestPCR", {}).then(() => console.log('CONECTADO A MONGO'));
