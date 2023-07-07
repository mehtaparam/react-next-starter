import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;
       
        connection.on('connected', () => {
            console.log('Mongo Connected Successfully');
        })

        connection.on('error',(err)=>{
            console.error('mongoose connect error');
            console.error(err);
            process.exit();
        })
    } catch (error) {
        console.error('mongoose error');
        console.error(error);
    }
}