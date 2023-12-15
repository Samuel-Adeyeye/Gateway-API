import mongoose from 'mongoose';
import isIp from 'is-ip';

export const Gateway = mongoose.model('Gateway', new mongoose.Schema({
    serial: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return isIp.v4(value);
            },
            message: "Invalid IPv4 address."
        }
    },
    peripherals: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Peripheral',
        }],
}, {
    timestamps: true
}));
