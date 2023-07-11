// 1. 定义 User Schema
const mongoose = require('mongoose');
const addressSchema = require('./addressSchema');
const userSchema = new mongoose.Schema({
    // Schema 的配置
    loginId: {
        type: String, // 类型是字符串
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 18,
        unique: true,   // 特殊索引，唯一索引
        // index: true,    // 将该字段设置为索引，当设置 unique 后，这个值可以为可选项
    },
    loginPwd: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 18,
        select: false,  // 默认情况下，查询用户时不会使用该字段
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 18,
    },
    loves: {
        type: [String], // 类型是一个数组，数组每一项是一个字符串
        required: true,
        default: [],    // 默认值为一个空数组
    },
    address: {
        type: addressSchema,
        required: true
    }
})

// 2. 通过 User Schema 定义模型，最终导出模型
module.exports = mongoose.model('User', userSchema)