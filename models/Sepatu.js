// const { number } = require('joi')
const mongoose = require('mongoose')

const sepatuSchema = mongoose.Schema({
    NamaMerekSepatu: {
        type: String,
        required: true
    },
    ModelSepatu: {
        type: String,
        required: true
    },
    JenisSepatu: {
        type: String,
        required: true
    },
    WarnaSepatu: {
        type: String,
        required: true
    },
    UkuranSepatu: {
        type: Number,
        required: true
    },
    JumlahSepatu: {
        type: Number,
        required: true
    },
    HargaPerPcsSepatu: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    versionKey: false

})
module.exports = mongoose.model('Sepatu', sepatuSchema, 'sepatu')