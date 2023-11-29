import mongoose, { Document, Model, Schema } from 'mongoose';

interface TransportAttributes {
    title: string;
    idTransport: string;
    description: string;
}

export interface TransportModelType extends Document, TransportAttributes {}

const transportSchema: Schema<TransportModelType> = new Schema({
    title: {
        type: String,
    },
    idTransport: {
        type: String,
    },
    description: {
        type: String,
    },
});

const Transport: Model<TransportModelType> = mongoose.model('transport', transportSchema);

export default Transport;
