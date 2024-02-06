import {MongoClient} from 'mongodb'
import {BlogCreateType, BlogEntityType} from "../types/blog-type";

import dotenv from 'dotenv'
import {PostCreateType, PostEntityType} from "../types/post-type";
dotenv.config()

const url = process.env.MONGO_URL

if(!url){
    throw new Error('! Url doesn\'t found')
}

console.log('url',url)

export const client = new MongoClient(url)
export const blogsCollection = client.db('db').collection<BlogEntityType | BlogCreateType>('blogs')
export const postsCollection = client.db('db').collection<PostEntityType | PostCreateType>('posts')

export const  runDb = async () =>{
    try {

        await client.connect();
        await client.db('blogs').command({ping: 1});
        console.log('Connect successfully to mongo server')


    }catch(e) {

        console.log('DONT connect successfully to mongo server')
        await client.close()
    }
}