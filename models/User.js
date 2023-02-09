const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const reactionSchema = require('./Reaction');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        //??? or to use validate ???
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    // ??? Array of _id values referencing the Thought model ???
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // ??? Array of _id values referencing the User model (self-reference) ???
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// ??? virtual called friendCount that retrieves the length of the user's friends array field on query ???
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
  return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
