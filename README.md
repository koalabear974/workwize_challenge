# Workwize Challenge [Frontend]

Here is the frontend solution to the tech assessment from Workwize.

## Requirements

Here are the main requirements for this project:
- Authentication: Register/Login forms for suppliers/users
- Supplier Interface: Dashboard: Manage Products, View Orders
- User Interface: Pages: Product List, Product Detail, Cart, Simple Checkout
- State Management: Global state for cart, session
- API Integration: Services for CRUD, checkout
- Styling: Responsive design with Tailwind

## Setup & Instalation

Frontend is based on Laravel with Breeze for a quick Auth setup.
Here is how to install:
- Clone the repository
- Run `npm install` or `yarn install`
- Copy .env.example to .env and setup required configuration (notably NEXT_PUBLIC_BACKEND_URL)
- Run `npm run dev` to run the server on local

## Walkthrough to development

Here you will see what steps I went through to develop this project.

### Research and setup

1. Research & trials of boilerplates & Starter kits
2. Once a good candidate has been chosen and tested in local I went through online setup.
3. First I created a online database for ease of use and future online setup
4. For the backend I first try hosting on Vercel but had some issues ended up hosting on DigitalOcean as PHP instances generaly require a whole LAMP stack.
5. For the frontend Vercel offer a pretty easy and free hosting for react so I went for that.
6. Once everything was working while being hosted I went back to local for development

### Structure and Planning

1. First I laid down which requirements are needed for backend and frontend by doin that I had a clear view on what models, routes, controller and pages I would need
2. Created all migrations needed to create and modify tables
3. Created related seeders

### Development



Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env` and supply the URL of your backend:

```
VITE_APP_BACKEND_URL=http://localhost:8000
```
