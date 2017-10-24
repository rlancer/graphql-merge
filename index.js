const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLList } = require('graphql')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const DataLoader = require('dataloader')
const opn = require('opn')

const DATA_PAYMENTS = [
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
  { id: '8', user_id: '3', message: 'For logo creation', amount: 33 },
  { id: '9', user_id: '1', message: 'For logo creation', amount: 33 }
]

const DATA_USERS = {
  '1': { id: '1', name: 'Jen' },
  '2': { id: '2', name: 'Sue' },
  '3': { id: '3', name: 'Marry' },
  '4': { id: '4', name: 'Liz' }
}

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
})

const Payment = new GraphQLObjectType({
  name: 'PaymentRequest',
  fields: {
    id: { type: GraphQLID },
    user_id: { type: GraphQLString },
    message: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    user: {
      type: User,
      resolve: ({ user_id }, _, ctx) => ctx.userLoader.load(user_id)
    }
  },
  date_created: { type: GraphQLString }
})

const queryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    payments: {
      type: new GraphQLList(Payment),
      async resolve(_, args) {
        return DATA_PAYMENTS
      }
    }
  }
})

const schema = new GraphQLSchema({ query: queryType })

const app = express()

const loadUsers = async keys => keys.map(key => DATA_USERS[key])

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
const url = `http://localhost:${port}/graphql`
console.log(`Opening ${url}`)
opn(url)
