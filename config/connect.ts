import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/Flyware')
    .then(
        () => {
            console.log('connected');
        }
    )
    .catch(
        (err: Error) => {
            console.log(err);
        }
    );

export default mongoose;
