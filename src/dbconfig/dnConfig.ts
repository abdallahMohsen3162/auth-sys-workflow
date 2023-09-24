import mongoose from 'mongoose';
export default async function connect() {
    try {
        if(process.env.MONGO_URI){
            mongoose.connect(process.env.MONGO_URI);
        }
        console.log("Hellllo");
        
        
    } catch (error) {
        console.log(process.env.DOMAIN!);
        
    }


}