import mongoose from "mongoose";


interface Option {

    mongoUrl: string,
    dbName: string
}

export class MongoDatbase {

    static async connect(option:Option) {

        const {dbName,mongoUrl} = option

        try {
            
            await mongoose.connect(mongoUrl,{
                dbName
            });
            console.log('Mongo DB connect!!!');
            return true

        } catch (error) {
            console.log('Mongo connection error');
            throw error
        }

    }

    static async disconnect(){
        await mongoose.disconnect();
    }
}