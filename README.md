# OSINT Tool
Find out what data is publicly available to any web client used by the user.

## Table of Contents

* [Overview](#overview)
* [Development](#development)
    * [Technology stack](#technology-stack)
    * [Microservices](#microservices)
* [Getting started](#getting-started)

## Overview

The Miyagami platform consists of two front-ends: the marketing pages and the application. They are both connected to the same back-end which is a Strapi application.


## Development

### Technology stack

After careful consideration the project will be built on a version of the [JAM Stack](https://jamstack.org/).

* A front-end application built using [React](https://reactjs.org/) and the [Next.js](https://nextjs.org/) framework.
* A back-end CMS application built with [Strapi](https://strapi.io/).
* An RDS database (hosted on [AWS](https://aws.amazon.com/)).

Why are we using the JAM stack? [Read more](https://jamstack.org/why-jamstack/)

### Microservices

The following services will be used in this project.

* Authentication will be provided by [AWS Cognito](https://aws.amazon.com/cognito/).
* UI components will be provided by [Tailwind UI](https://tailwindui.com/).
* For the Email provider [Sendgrid](https://sendgrid.com/) will be used.
* [Vercel](https://vercel.com/) will be used for deploying the front-end.


## Getting started

This step by step guide will familiarize you with how to get started with the project right away.

### 1. NodeJS

>We will be using the LTS version of [NodeJS](https://nodejs.org/en/). To switch node versions use a node version manager.
The nvm [n](https://github.com/tj/n) is recommended.

```
node -v

sudo npm install -g n 
sudo n 14.15.4  # Current LTS
```

### 2. Front-end

>[Next.js](https://nextjs.org/docs) gives you the best developer experience with all the features you need for production:
hybrid static & server rendering, TypeScript support, smart bundling, route prefetching, and more. No config needed.

```
npm install
npm run dev
```

You can start editing the page by modifying `pages/index.jsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Why are we using Next.js? [Read more](https://medium.com/better-programming/next-js-for-react-why-you-should-give-it-a-try-right-now-e3b1886e4f20)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
