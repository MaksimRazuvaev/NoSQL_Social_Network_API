const { restart } = require('nodemon');
const { User, Thought } = require('../models');

module.exports = {

  // Get all thoughts
//router.route('/').get(getThought).post(createThought);
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // Get a thought
  //router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    // '-__v' is version key. VK is automaticaly added to the document (particular thought)
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a thought
  //router.route('/').get(getThought).post(createThought);
  // req.body example
  /*{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}*/
createThought(req, res) {
    Thought.create(req.body)
      .then( ( thought ) => {
        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
        )
      // })
      .then(() => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    })},
  // },

  // Delete a thought
  //router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought deleted, but no user found',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a thought
  //router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
  // req.body example
  /*{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}*/
updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //add reaction
  //router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);
  addReaction(req, res)  {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: {reactions : req.body } },
      { runValidators: true, new: true }
    )
  
      .then(thought => {
        if (!thought) {
          return res.status(404).json({ error: 'Thought not found' });
        }
        res.json(thought)
        })

        /*.then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )*/
      .catch(error => res.status(500).json({ error: 'Error finding thought' }));
  },

  /*async addReaction(req, res) {
    try {
      await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
  
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: 'Error finding thought' });
    }
  },*/

    //remove reaction
  //router.route('/:thoughtId/reactions/').delete(removeReaction);
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      //for this one route router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
      // { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    )
      .then(thought => {
        if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
        }
        res.json(thought);
      })
    .catch(error => res.status(500).json({ error: 'Error finding thought' }));
  },
};
