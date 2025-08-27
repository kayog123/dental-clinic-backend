# Dental Clinic Web Application - Backend

This is a backend application built with a modern tech stack for scalability, performance, and maintainability.

## Project Overview

This is a Node.js backend application built with Express.js, utilizing Prisma as the ORM for managing database queries with an AWS Aurora PostgreSQL database. The application is deployed on AWS Elastic Kubernetes Service (EKS) and uses AWS API Gateway to handle requests and prevent CORS issues for frontend integration. The project is designed to handle complex database relationships and provide a scalable backend solution. The secret key is stored in an AWS EKS secret.

## Tech Stack

- [Node.js](https://nodejs.org/): A JavaScript runtime built on Chrome's V8 JavaScript engine, optimized for performance and scalability.
- [Express.js](https://expressjs.com/): A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [Prisma](https://www.prisma.io/): A modern database client that provides an ORM (Object-Relational Mapping) for managing database operations, enabling developers to work with databases using familiar JavaScript syntax.
- [AWS Aurora PostgreSQL](https://aws.amazon.com/rds/aurora/postgresql/): A fully managed, PostgreSQL-compatible relational database service that provides scalability, high availability, and data protection.
- [AWS API Gateway](https://aws.amazon.com/api-gateway/): A fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.
- [AWS ECR](https://aws.amazon.com/ecr/): A fully managed container registry service that makes it easy to store, manage, and deploy container images.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- AWS CLI (configured with appropriate credentials)
- Kubernetes CLI (kubectl)
- Prisma CLI
- Docker

## Frontend Repository

The frontend repository can be found [here](https://github.com/kayog123/dentail-clinic-frontend).

#### Getting Started on building

- Clone the repository to your local machine

```bash
git clone git@github.com:kayog123/dental-clinic-backend.git
```

- Install the dependencies

```bash
npm i
```

- Start the application

```bash
npm run dev
```

- Build the feature and deploy to the main branch
- If you have schema changes, run the following command to generate the Prisma Client

```bash
npx prisma generate
```

then migrate

```bash
npx prisma migrate dev --name init
```

## Deployment

The application can be deployed to AWS using the provided `deploy.sh` script. The script will build the Docker image, push it to the ECR, and deploy the application to EKS.

```bash
./deploy.sh
```

## Database Schema

Please check the [schema.prisma](schema.prisma) file for the database schema and relationships.

## License

This project is licensed under the MIT License.
