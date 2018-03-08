import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import get from 'lodash/get';
import gql from 'graphql-tag';

const PagesVisitedView = ({ data }) => {
  if (data.loading) {
    return <p>Loading...</p>;
  } else {
    const pagesVisited = get(data, ['personById', 'activity', 'pagesVisited']);
    if (pagesVisited) {
      return <p>Pages Visited: {pagesVisited}</p>;
    } else {
      return (
        <div>
          <p>No data for pages visited:</p>{' '}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      );
    }
  }
};
const PagesVisited = graphql(
  gql`
    query PagesVisited {
      personById(id: "1") {
        id
        # activity(timeRange: "today") {
        activity: activityToday {
          pagesVisited
        }
      }
    }
  `
)(PagesVisitedView);

const TimeSpentView = ({ data }) => {
  if (data.loading) {
    return <p>Loading...</p>;
  } else {
    const timeSpent = get(data, ['personById', 'activity', 'timeSpent']);
    if (timeSpent) {
      return <p>Time Spent {timeSpent}</p>;
    } else {
      return (
        <div>
          <p>No data for time spent:</p>{' '}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      );
    }
  }
};
const TimeSpent = graphql(gql`
  query TimeSpent {
    personById(id: "1") {
      id
      activity(timeRange: "today") {
        timeSpent
      }
    }
  }
`)(TimeSpentView);

class TimeSpentLoader extends Component {
  state = { show: false };

  render() {
    if (this.state.show) {
      return <TimeSpent />;
    } else {
      return (
        <p>
          <button onClick={() => this.setState({ show: true })}>
            Load Time Spent
          </button>
        </p>
      );
    }
  }
}

class App extends Component {
  render() {
    const { data: { loading, people } } = this.props;
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in
            Apollo Client. Edit the source code and watch your browser window
            reload with the changes.
          </p>
          <p>
            The code which renders this component lives in{' '}
            <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and
            ids.
          </p>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <React.Fragment>
            <ul>
              {people.map(person => <li key={person.id}>{person.name}</li>)}
            </ul>
            <PagesVisited />
            <TimeSpentLoader />
          </React.Fragment>
        )}
      </main>
    );
  }
}

export default graphql(
  gql`
    query ErrorTemplate {
      people {
        id
        name
        activityToday {
          pagesVisited
        }
      }
    }
  `
)(App);
