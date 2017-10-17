const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLList } = require('graphql')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const DataLoader = require('dataloader')

const DATA_PAYMENT_REQUESTS = [
  { id: '1', user_id: '1', message: 'For logo creation', amount: 33 },
  {
    id: '1',
    user_id: '1',
    message: 'For logo creation',
    amount: 33
  },
  { id: '2', user_id: '1', message: 'For logo creation', amount: 33 },
  {
    id: '1',
    user_id: '1',
    message: 'For logo creation',
    amount: 33
  },
  { id: '4', user_id: '1', message: 'For logo creation', amount: 33 },
  {
    id: '1',
    user_id: '1',
    message: 'For logo creation',
    amount: 33
  },
  { id: '5', user_id: '2', message: 'For logo creation', amount: 33 },
  { id: '6', user_id: '3', message: 'For logo creation', amount: 33 },
  { id: '7', user_id: '4', message: 'For logo creation', amount: 33 },
  { id: '8', user_id: '3', message: 'For logo creation', amount: 33 }
]

const DATA_USERS = [{ id: '1', name: 'Jen' }, { id: '2', name: 'Sue' }, { id: '3', name: 'Marry' }, { id: '4', name: 'Liz' }]

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
})

const PaymentRequest = new GraphQLObjectType({
  name: 'PaymentRequest',
  fields: {
    id: { type: GraphQLID },
    user_id: { type: GraphQLString },
    message: { type: GraphQLString },
    amount: { type: GraphQLFloat }
  },
  date_created: { type: GraphQLString }
})

const queryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    paymentRequests: {
      type: new GraphQLList(PaymentRequest),
      async resolve(_, args) {
        return DATA_PAYMENT_REQUESTS
      }
    }
  }
})

const schema = new GraphQLSchema({ query: queryType })

const app = express()

function loadUsers(keys) {}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    context: {
      userLoader: new DataLoader(async keys => await loadUsers(keys))
    }
  })
)

const port = 4000
app.listen(port)
console.log('Listing on port ', port)
