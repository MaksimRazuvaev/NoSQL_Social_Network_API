const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// GET all Thoughts / POST an Thought :
// /api/users
// !!!!!!!!!!!! POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.route('/').get(getThought).post(createThought);

// GET PUT DELETE a single Thought: 
// /api/users/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// POST DELETE new reaction stored in a single thought's reactions array field
// /api/thoughts/:thoughtId/reactions
// router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

router.route('/:thoughtId/reactions/').post(addReaction).delete(removeReaction);


module.exports = router;
