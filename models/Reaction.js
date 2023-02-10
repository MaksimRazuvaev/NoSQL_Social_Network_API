const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const thoughtSchema = require('./Thought');

// Schema to create User model
const reactionSchema = new Schema(
  {
    reactionId: {
        //Use Mongoose's ObjectId data type
        type: Schema.Types.ObjectId,
        //Default value is set to a new ObjectId
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        // ???? Must be between 1 and 280 characters ????
        minLength: 1,
        maxLength: 280,
        // ?????
        /*validate: [
            (value) => value.length >= 1 && value.length <= 280,
            'Reaction text must be between 1 and 280 characters'
          ]*/
    },
    // ???? The user that created this thought ????
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //???? Use a getter method to format the timestamp on query ???? is it wtat asked ????
        //get: createdAt => createdAt.toLocaleString()
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//Should be only one thoughtSchema for all getters ???
//???? Use a getter method to format the timestamp on query ???? is it wtat asked ????
reactionSchema
    .path('createdAt')
    .get(function (createdAt) {
    return createdAt.toLocaleString();
});


const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
