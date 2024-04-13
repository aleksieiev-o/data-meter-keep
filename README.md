### Data meter keep application

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

###### To run the project in development mode with database emulation using empty database you have to run this script:

```
fb_em_start
```

###### To seed the emulated project database you have to create a database using correct schema and run this script:

```
npm run fb_em_export_db
```

After this database files are created in the directory _'/data-meter-keep/src/lib/firebase/seed.development/database_export'_.

###### To run the project in development mode with database emulation you have to run this script:

```
npm run fb_em_start_import_db
```
