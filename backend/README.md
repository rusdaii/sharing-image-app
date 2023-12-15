## How to run in your local machine

1. Clone the repository.
2. Make sure you have `Node.js v20.5.1` installed.
3. Make sure you have `npm` installed.
4. Duplicate `.env.example` file into `.env` and make changes accordingly.
5. Run `npm install` in project directory to install all the dependencies.
6. Run `npm run prisma:migrate`.
7. Run `npm run start:dev` to start the website in your local machine with development mode.

## How to see database

You can run the following command to see the database in your local machine

```bash
npx prisma studio
```
