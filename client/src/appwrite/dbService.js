import conf from "../config/conf.js";
import { Client, Databases, Query } from "appwrite";

class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteApiEndpoint)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  // create post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      slug = slug.length > 36 ? slug.substring(0, 36) : slug;

      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        // data to be uploaded
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("APPWRITE SERVICE ERROR : Post POST failed : ", error);
    }
  }

  // update post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("APPWRITE SERVICE ERROR : Post UPDATE failed : ", error);
    }
  }

  // delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      return true;
    } catch (error) {
      console.log("APPWRITE SERVICE ERROR : Post DELETE failed : ", error);
      return false;
    }
  }

  // get single post
  async getPost(slug) {
    try {
      return this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("APPWRITE SERVICE ERROR : Post GET failed : ", error);
      return false;
    }
  }

  // get all posts
  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("APPWRITE SERVICE ERROR : Post GET ALL failed : ", error);
    }
  }
}

const service = new Service();
export default service;

// const databases = new Databases(client);
//
// databases.createDocument(
//     '<DATABASE_ID>',
//     '<COLLECTION_ID>',
//     ID.unique(),
//     { "title": "Hamlet" }
// );
