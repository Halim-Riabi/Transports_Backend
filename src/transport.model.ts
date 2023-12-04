import mongoose, { Schema, Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

interface ITransport extends Document {
  title: string;
  idTransport: string;
  description: string;
}

const transportSchema: Schema = new Schema({
  title: { type: String, required: true },
  idTransport: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

transportSchema.plugin(mongoosePaginate);

const Transport = mongoose.model<ITransport>('Transport', transportSchema);

export default Transport;
