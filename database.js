/**
 * Fake database with Topics and comments.
 */
const data = {
  uid: { nextTopic: 4, nextComment: 10 },
  Topic: {
    1: { author: 'Xavyr', text: 'I love Portland.', comments: [1, 2, 3] },
    2: { author: 'Xavyr', text: 'I love IPAs.', comments: [4, 5, 6] },
    3: { author: 'Xavyr', text: 'Drink local or not at all.', comments: [7, 8, 9] },
  },
  Comment: {
    1: { author: 'Eric', text: 'No waves... Left swipe.', topic: 1 },
    2: { author: 'Skyler', text: 'The housing market is inflated... Left swipe.', topic: 1 },
    3: { author: 'Andrew', text: 'The best IPAs in the world... Right swipe.', topic: 1 },
    4: { author: 'Max', text: 'I love Clif bars!', topic: 2 },
    5: { author: 'Skyler', text: 'Model is my favorite beer.', topic: 2 },
    6: { author: 'Eric', text: 'IPAs suck.', topic: 2 },
    7: { author: 'Andrew', text: "Couldn't agree more...", topic: 3 },
    8: { author: 'Eric', text: 'Surf local or not at all. Venice has the sickest waves!', topic: 3 },
    9: { author: 'Max', text: 'Has anyone seen my Clif bar?', topic: 3 },
  },
};

module.exports = data;
