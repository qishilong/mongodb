// 1. 定义 Operation 和 Schema
const mongoose = require('mongoose');
const operationType = require('./operationType');
const addressSchema = require('./addressSchema');
const operationSchema = new mongoose.Schema({
    // Schema 的配置
    operation: {
        type: String, // 类型是字符串
        required: true,
        enum: operationType
    },
    time: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    extraInfo: {
        type: mongoose.Schema.Types.Mixed  // 任意类型
    },
    address: {
        type: addressSchema,
        required: true
    }
})

// 2. 通过 Operation Schema 定义模型，最终导出模型
module.exports = mongoose.model('Operation', operationSchema);