# Magazine Platform – Microservices Architecture

## Project Description

This project is a **Magazine Platform backend system** developed using a **microservices architecture**. Each service is independently developed and responsible for a specific domain.

The system is designed as a **Minimum Viable Product (MVP)** to demonstrate:

* Microservices architecture design
* API Gateway implementation
* CRUD-based service development
* Independent service deployment

All services are integrated through a **central API Gateway**, allowing access via a single entry point.

---

## Project Cloning

To clone the repository:

```bash
git clone https://github.com/your-username/magazine-platform.git
cd magazine-platform
```

Note:

* Replace `your-username` with your GitHub username
* Make sure Git is installed on your system

---

## Pull Latest Code

Before starting development, always pull the latest changes:

```bash
git pull origin main
```

If you are working on a branch:

```bash
git pull origin <branch-name>
```

---

## Project Structure

```bash
magazine-platform/
│
├── api-gateway/              # API Gateway (Single entry point)
│
├── user-service/             # User management service
├── article-service/          # Article management service
├── category-service/         # Category management service
├── comment-service/          # Comment management service
├── subscription-service/     # Subscription management service
├── media-service/            # Media handling service
│
├── .gitignore
└── README.md
```

---

## Technologies Used

* Node.js
* TypeScript
* Express.js
* REST API
* Microservices Architecture

---

## API Gateway

The API Gateway acts as the **single entry point** for all client requests.

Example routes:

```bash
/api/v1/users
/api/v1/articles
/api/v1/categories
/api/v1/comments
/api/v1/subscriptions
/api/v1/media
```

---

## Team Members and Responsibilities

| Member               | Service              |
| -------------------- | -------------------- |
| Member 1 : Aweesha   | User Service         |
| Member 2 : Ishara    | Article Service      |
| Member 3 : Dinitha   | Category Service     |
| Member 4 : Isuru     | Comment Service      |
| Member 5 : Rivith    | Subscription Service |
| Member 6 : Sachintha | Media Service        |

---

## How to Run the Project

For each service:

```bash
cd <service-folder>
npm install
npm run dev
```

Repeat for:

* api-gateway
* all microservices

---

## Key Features

* Independent microservices
* CRUD operations for each service
* API Gateway routing
* Scalable architecture
* Clean project structure

---

## Important Notes

* Each service runs on a separate port
* API Gateway unifies all services under one endpoint
* Ensure all services are running before testing
* Do not commit `node_modules`

---

## Contribution Guidelines

* Each member works on their assigned service
* Use separate branches for development
* Pull latest code before starting work
* Write clear commit messages

