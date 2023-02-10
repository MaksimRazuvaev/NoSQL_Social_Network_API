const thoughtSchema = new mongoose.Schema({
    thoughtText: {
      type: String,
      required: true,
      validate: [
        (value) => value.length >= 1 && value.length <= 280,
        'Thought text must be between 1 and 280 characters'
      ]
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
      required: true
    },
    reactions: [{
      reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        validate: [
          (value) => value.length >= 1 && value.length <= 280,
          'Reaction text must be between 1 and 280 characters'
        ]
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  });