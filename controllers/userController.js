const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    // '-__v' is version key. VK is automaticaly added to the document (particular user)
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  // req.body example
  /*{
    "username" : "user name",
    "email" : "adf@fdas.asd",
    "thoughts" : [thoudht._id,],
    "friends" : [user._id, ]
   }*/
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } }), 
// ???is it valid complimentary to thought delete???
            // User.deleteMany({ _id: { $in: user.friends } })
      )
      .then(() => res.json({ message: 'User deleted with THoughts and Friends!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
    // req.body example
  /*{
    "username" : "user name",
    "email" : "adf@fdas.asd",
    "thoughts" : [thoudht._id,],
    "friends" : [user._id, ]
   }*/
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //router.route('/:userId/friends/:friendId').post(addFriend)
  addFriend(req, res)  {
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
    .catch(error => res.status(500).json({ error: 'Error finding thought' }));
  },

  removeFriend(req, res)  {
    User.findOne({ _id: req.params.userId })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        User.findOne({ _id: req.params.friendId })
          .then(friend => {
            if (!friend) {
              return res.status(404).json({ error: 'Friend not found' });
            }
  
            // Remove the friend from the user's friends list
            user.friends = user.friends.filter(id => !id.equals(friend._id));
  
            user
              .save()
              .then(user => res.json({ success: true, friends: user.friends }))
              .catch(error =>
                res.status(500).json({ error: 'Error adding friend' })
              );
          })
          .catch(error => res.status(500).json({ error: 'Error finding friend' }));
      })
      .catch(error => res.status(500).json({ error: 'Error finding user' }));
  },
};
