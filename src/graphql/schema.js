import { makeExecutableSchema } from 'graphql-tools';

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

const typeDefs = `
  type Query {
    people: [Person]
    personById(id: ID): Person
  }

  type Person {
    id: ID
    name: String
    activity(timeRange: String!): PersonActivityReport
    # sugar for activity(timeRange: "today")
    activityToday: PersonActivityReport
  }

  type PersonActivityReport {
    pagesVisited: PersonActivityReportStat
    timeSpent: PersonActivityReportStat
  }

  type PersonActivityReportStat {
    total: Int
  }
`;

const resolvers = {
  Query: {
    people: () => peopleData,
    personById: (q, args, ctx) =>
      peopleData.find(p => p.id.toString() === args.id),
  },
  Person: {
    activity: () => ({}),
    activityToday: () => ({}),
  },
  PersonActivityReport: {
    pagesVisited: () => ({ total: 42 }),
    timeSpent: () => ({ total: 100 }),
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
