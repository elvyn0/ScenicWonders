# Scenic Wonders

### [Live Demo](https://scenic-wonders.vercel.app) | [Admin Panel](https://scenic-wonders-adminpanel.vercel.app) | [Portfolio](https://anoop-portfolio-nine.vercel.app)

## 📌 Overview
**Scenic Wonders** is a production-ready, full-stack travel social and booking ecosystem built with the **MERN stack**. It features a decoupled architecture consisting of a client-facing platform, a data-driven admin dashboard, and a centralized backend server.

The platform enables users to discover destinations, manage real-time bookings, and engage via instant peer-to-peer messaging, all while maintaining high standards of security and responsiveness.

## 🚀 Key Features

### User Experience
*   **Real-Time Communication:** Instant messaging layer powered by **Socket.io** for seamless user interaction.
*   **Secure Transactions:** End-to-end payment processing integrated with **Stripe API**.
*   **AI-Powered Assistance:** Context-aware travel recommendations utilizing **Groq/Llama**.
*   **Booking Engine:** Advanced date-based availability logic and reservation management.
*   **Authentication:** Granular authorization and session handling using **JWT** and protected routing.

### Admin Management
*   **Data-Driven Dashboard:** Comprehensive monitoring of business metrics including revenue and user growth.
*   **Inventory Control:** Full **CRUD** functionality over global hotel listings and travel content.
*   **Moderation:** Centralized management of user accounts and booking statuses.

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Next.js, Tailwind CSS, Redux/Context API, Axios |
| **Backend** | Node.js, Express.js (MVC Architecture) |
| **Database** | MongoDB, Mongoose |
| **Real-Time** | Socket.io |
| **Security** | JWT, Stripe API, Web Security |
| **Cloud/DevOps** | Cloudinary (Images), Vercel (Frontend), Render (Backend), Git |

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/elvyn0/ScenicWonders.git
    cd ScenicWonders
    ```

2.  **Environment Configuration**
    Create a `.env` file in the backend directory with the following:
    * `MONGO_URI`
    * `JWT_SECRET`
    * `STRIPE_SECRET_KEY`
    * `CLOUDINARY_URL`

3.  **Install Dependencies & Launch**
    ```bash
    # For Frontend, Backend, and Admin
    npm install
    npm run dev  # or npm run server for backend
    ```

## 👤 Author
**Anoop S**
*   **GitHub:** [@elvyn0](https://github.com/elvyn0)
*   **LinkedIn:** [linkedin.com/in/anoop0](https://www.linkedin.com/in/anoop0)
*   **Role:** Full-Stack Software Engineer
