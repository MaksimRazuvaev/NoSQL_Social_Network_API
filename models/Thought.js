const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const reactionSchema = require('./Reaction');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        // Must be between 1 and 280 characters
        minLength: 1,
        maxLength: 280,
        /*validate: [
            (value) => value.length >= 1 && value.length <= 280,
            'Thought text must be between 1 and 280 characters'
        ]*/
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // ???? instead of line 42 ????? to test it out to make sure it's working
        // get: createdAt => createdAt.toLocaleString(),
    },
    // ???? The user that created this thought ????
    // Session storage to get current user posted the thought ?????
    username: {
        type: String,
        required: true,
    },
    // ??? These are like replies. Array of nested documents created with the reactionSchema ???
    reactions: [ reactionSchema ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//Should be only one thoughtSchema for all getters ???
//???? Use a getter method to format the timestamp on query ???? is it wtat asked ????
thoughtSchema
    .path('createdAt')
    .get(function (createdAt) {
    return createdAt.toLocaleString();
});

// virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
    return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
