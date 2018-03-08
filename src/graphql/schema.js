import { makeExecutableSchema } from 'graphql-tools';

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

const typeDefs = `
  type Query {
    people: [Person]
  }

  type Person {
    id: ID
    name: String
  }
`;

const resolvers = {
  Query: {
    people: () => peopleData,
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
