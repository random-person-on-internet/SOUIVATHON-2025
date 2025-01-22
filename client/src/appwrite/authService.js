import conf from "../config/conf.js";
import { Client, Account, ID } from "appwrite";

// export class so we can make object from it and use methods wherever necessary
// to avoid vendor lock in, we make a wrapper around firebase for rest of our application

class AuthService {
  client = new Client();
  account;

  // create client and account when object created
  constructor() {
    try {
      this.client
        .setEndpoint(conf.appwriteApiEndpoint)
        .setProject(conf.appwriteProjectId);

      this.account = new Account(this.client);
    } catch (error) {
      console.log(
        "APPWRITE SERVICE ERROR : Failed to initialize AuthService : ",
        error
      );
    }
  }

  // used to create user account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("APPWRITE SERVICE ERROR : createAccount : ", error);
    }
  }

  // login automatically when user account created
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("APPWRITE SERVICE ERROR : login : ", error);
    }
  }

  // logout
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("APPWRITE SERTICE ERROR : logout : ", error);
    }
  }

  // is user logged in?
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("APPWRITE SERVICE ERROR : getUser : ", error);
    }

    // if you dont get user cuz of issues
    return null;
  }
}

const authService = new AuthService();
export default authService;

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);

// const user = await account.create(
//     ID.unique(),
//     'email@example.com',
//     'password'
// );

// const session = await account.createEmailPasswordSession(
//     email,
//     password
// );

// const result = await account.deleteSession(
//     '<SESSION_ID>' // sessionId
// );
