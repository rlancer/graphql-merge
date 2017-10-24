# GraphQL - Merge Example 

> An example which shows how to merge 2 data sources into one via GraphQL

## Getting started 

```bash
git clone git@github.com:rlancer/graphql-merge.git
cd graphql-merge 

# yarn  
yarn
yarn start 

# npm 
npm i 
npm start
```

It should automatically open up the GraphiQL interface, paste in the following query to see it work.

```graphql
{
  payments {
    id
    user_id
    message
    amount
    user {
      id
      name
    }
  }
}

```




## Lear more on Medium [Merging RethinkDB and Postgres with GraphQL](https://medium.com/@robizm/merging-rethinkdb-and-postgres-with-graphql-b8801f69c8ea)

