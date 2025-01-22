# Blog Application with React and Appwrite

Welcome to my Blog Application project! This project demonstrates how to build a fully functional blog application using **React**, **Redux Toolkit**, and **Appwrite**. The application supports features such as creating, viewing, updating, and deleting blog posts while showcasing my learnings with **Redux Toolkit** and **routing** in React. It also integrates with **Appwrite** as the backend for data storage and management.

## Features

- **User Authentication**: Users can sign up, log in, and access their posts.
- **CRUD Operations**: Users can create, read, update, and delete their own posts. Posts are stored securely using Appwrite.
- **Post Creation**: Write, edit, and upload posts with titles, content, and featured images.
- **Routing**: The app uses **React Router** to manage navigation and display individual posts.
- **State Management**: Redux Toolkit is used to manage global state and handle actions such as fetching, adding, and updating posts.
- **Appwrite Integration**: The application interacts with the Appwrite backend to store and retrieve data (posts and images).

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Redux Toolkit**: For state management and dispatching actions across the app.
- **Appwrite**: A backend server for managing data, authentication, and file storage.
- **React Router**: For navigating between pages and rendering components based on the URL.
- **TailwindCSS**: For fast, utility-first CSS styling.
- **Vite**: For fast build setup and development.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [Appwrite account](https://appwrite.io/) and an active project set up

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/random-person-on-internet/Blog-App.git
   
   cd blog-application
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up Appwrite:
   - Create a project in [Appwrite](https://appwrite.io/) and get your API endpoint and project ID.
   - Set up a database with the relevant collections and documents.
   - Add all environment variables as given in `.env.sample`.
   - Update the `config.js` file with your Appwrite API endpoint and project details.

4. Run the application in development mode:

   ```bash
   npm run dev
   ```

   The app should be accessible at [http://localhost:5173](http://localhost:5173).

## Contributing

I welcome contributions to this project! If you find any bugs or have suggestions for improvements, feel free to open a pull request (PR) or create an issue.

### How to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your fork (`git push origin feature/your-feature`).
5. Open a pull request.


## Contact

If you have any questions, feel free to reach out to me at [vedlakkad05@gmail.com](vedlakkad05@gmail.com).

---