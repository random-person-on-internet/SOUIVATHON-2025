import conf from "../config/conf";
import { Client, Storage, ID } from "appwrite";

class StorageHandler {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteApiEndpoint)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  // file upload
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("APPWRITE SERVICE ERROR : File POST failed : ", error);
      return false;
    }
  }

  // file delete
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);

      return true;
    } catch (error) {
      console.log("APPWRITE SERVICE ERROR : File DELETE failed : ", error);
      return false;
    }
  }

  // file get
  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("APPWRITE SERVICE ERROR : File GET failed : ", error);
      return false;
    }
  }
}

const storageHandler = new StorageHandler();
export default storageHandler;
