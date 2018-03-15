const { makeExecutableSchema } = require('graphql-tools');
const data = require('./database');

/**
 * ---------- GraphQL SCHEMA ----------
 */

// Type definitions.
const typeDefs = `
  # Define "live" directive in the schema.
  directive @live on FIELD_DEFINITION

  # Queries that can be live should be marked with "@live" on the schema.
  type Query {
    Topics: [Topic]
    Topic(id: ID!): Topic @live
    Comments: [Comment]
    Comment(id: ID!): Comment
  }

  # Mutations that can change data in a live query should be marked with "@live".
  type Mutation {
    updateTopic(id: ID!, text: String!): Topic @live
    createComment(topic: ID!, text: String!, author: String!): Comment @live
    updateComment(id: ID! text: String!): Comment @live
    deleteComment(id: ID!): Comment @live
  }

  type Topic {
    id: ID!
    author: String!
    text: String!
    comments: [Comment]
  }
  
  # A dependency needs to have a reference to its parent. 
  type Comment {
    id: ID!
    author: String!
    text: String!
    topic: Topic
  }
`;

// Resolvers.
const resolvers = {};

resolvers.Query = {
  Topics: () => {
    const resolve = [];
    const topics = data.Topic;
    const ids = Object.keys(topics);
    for (let i = 0; i < ids.length; i += 1) {
      const topic = topics[ids[i]];
      topic.id = ids[i];
      resolve.push(topic);
    }
    return resolve;
  },
  Topic: (_, { id }) => {
    const resolve = { ...data.Topic[id] };
    resolve.id = id;
    return resolve;
  },
  Comments: () => {
    const resolve = [];
    const comments = { ...data.Comment };
    const ids = Object.keys(comments);
    for (let i = 0; i < ids.length; i += 1) {
      const comment = comments[ids[i]];
      comment.id = ids[i];
      resolve.push(comment);
    }
    return resolve;
  },
  Comment: (_, { id }) => {
    const resolve = { ...data.Comment[id] };
    resolve.id = id;
    return resolve;
  },
};

resolvers.Mutation = {
  updateTopic: (_, { id, text }) => {
    const topic = data.Topic[id];
    topic.text = text;
    const resolve = { ...topic };
    resolve.id = id;
    return resolve;
  },
  createComment: (_, { topic, text, author }) => {
    const id = data.uid.nextComment;
    data.Comment[id] = { author, text, topic };
    data.Topic[topic].comments.push(id);
    data.uid.nextComment += 1;
    const resolve = { ...data.Comment[id] };
    resolve.id = id;
    return resolve;
  },
  updateComment: (_, { id, text }) => {
    data.Comment[id].text = text;
    const resolve = { ...data.Comment[id] };
    resolve.id = id;
    return resolve;
  },
  deleteComment: (_, { id }) => {
    const resolve = { ...data.Comment[id] };
    resolve.id = id;
    delete data.Comment[id];
    const { comments } = data.Topic[resolve.topic];
    for (let i = 0; i < comments.length; i += 1) {
      if (data.Topic[resolve.topic].comments[i] == id) {
        comments.splice(i, 1);
        break;
      }
    }
    return resolve;
  },
};
resolvers.Topic = {
  comments: ({ comments }) => {
    const resolve = [];
    const commentData = { ...data.Comment };
    for (let i = 0; i < comments.length; i += 1) {
      const comment = commentData[comments[i]];
      comment.id = comments[i];
      resolve.push(comment);
    }
    return resolve;
  },
};

// A dependency needs to return it's parent in the event of a mutation. If a comment
// is updated. The topic it's a comment to should be returned.
resolvers.Comment = {
  topic: ({ id }) => {
    const comment = { ...data.Comment[id] };
    const resolve = { ...data.Topic[comment.topic] };
    resolve.id = comment.topic;
    return resolve;
  },
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });

