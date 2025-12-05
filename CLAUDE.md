# Claude Code Rules

## General instructions to Claude Code
- In Javascript, always use regular functions, not arrow functions.
- When making api calls in any javascript file, use try/catch instead of promise chaining.
- Use ES6 syntax for import/export.
- If I say "dncc", that means do not add, modify or change any code.
- Use the generalContext.txt file to understand the general context and user flow of the application so you have an understanding of what is being built and make better decisions
- Use the "Postgres Database Tables" section of technicalContext.txt file to reference this project's database schema/structure when creating postgres sql queries
- When I tell you to create a new database table or query, keep in mind, I am referring to Postgres
- I use nano ids for all unique ids, therefore any columns storing this data should be the datatype of char(21). The only exception to this is for user_id (and any references to it), this should be varchar(50) instead
- Prefix all the db table names in sql queries with the PG_DB_SCHEMA env variable, unless it is a query to create a new column, in that case, put the actual schema in the query.
- After you provide me a sql query to create a new column or table, add it to the appropriate location in the "Postgres Database Tables" section of the technicalContext.txt file
- when i ask for you to create me an api endpoint, use the endpoints in the app/api/exampleEndpoints/route.js file as a model of how to build API endpoints; the equality symbols (< >) in this file are placeholders; please ensure the import paths are correct as well
- After you create an API Endpoint, add it to the "API Endpoints" Section of the technicalContext.txt in the following format: Endpoint name, Endpoint Path, Endpoint Method, Request Params, Request Object
- When calling an API endpoint, use the "API Endpoints" Section of the technicalContext.txt for reference of what the endpoint's path, method, request and response is. Also use the app/_exampleApiCall/examples.js file as a model of how to create the function to call the API endpoint; the equality symbols (< >) in this file are placeholders; please pay attention to comments in the file that say: "INSTRUCTION TO CURSOR"