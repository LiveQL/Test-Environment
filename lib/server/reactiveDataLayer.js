/**
 * This file creates the reactive data layer (RDL) object. It stores the live data
 * in 'store' and the list of subscribers in 'subscriptions'.
 */

const RDL = {};

// Data from query resolution will be stored in the store object.
RDL.store = {};

// Subscription data will be stored in the subscriptions object.
// The key is the hash of the query and the value is the query, any
// variables, and the number of listeners.
RDL.subscriptions = {};

module.exports = RDL;
