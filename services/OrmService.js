import clientPromise from "../lib/mongodb";
import {ObjectID} from 'mongodb';
import  { MongoConfigService } from "./MongoConfigService";

const connectToDb = async () => {
    const client = await clientPromise;
    return await client.db(MongoConfigService.databases.sample_mflix);
}

export const OrmService = {

    getItems: async (dbName) => {
        const db = await connectToDb();
        return await db.collection(dbName).find({}).limit(10).toArray();
    },
    getItem: async (dbName,itemId) => {
        const db = await connectToDb();
        return await db.collection(dbName).findOne({_id: new ObjectID(itemId)});
    },
    createItem: async (dbName,item) => {
        const db = await connectToDb();
        return await db.collection(dbName).insertOne(item);
    },
    updateItem: async (dbName,itemId,item) => {
        const db = await connectToDb();
        return await db.collection(dbName).findOneAndUpdate(
            { _id: new ObjectID(itemId) },
            { $set: item },
            { returnDocument: "after" }
        );
    },
    deleteItem: async (dbName,itemId) => {
        const db = await connectToDb();
        return await db.collection(dbName).findOneAndDelete({_id: new ObjectID(itemId)});
    },
}