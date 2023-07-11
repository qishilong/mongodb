const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/learn');
mongoose.connection.on('open', () => {
    console.log('连接已打开');
})
