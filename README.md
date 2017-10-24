# Merging RethinkDB and Postgres with GraphQL 


> An example which shows how to merge 2 data sources into one via GraphQL &middot; *[Read the full post on Medium](https://medium.com/@robizm/merging-rethinkdb-and-postgres-with-graphql-b8801f69c8ea)*

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

![graphql-merge](https://user-images.githubusercontent.com/1339007/31953649-800fd524-b8b1-11e7-9520-98fc7d3b5490.png)

# Enjoy 
Join me on [Collaborizm](https://www.collaborizm.com/) for more tech and hacking! 


