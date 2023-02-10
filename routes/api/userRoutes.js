const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/studentController');

// GET all users / POST an user / PUT(update) an user: /api/users
router.route('/').get(getUsers).post(createUser);


// POST create a new user: /api/users
// router.route('/').post(createUser);


//?????????? Instead of: ???????????????????
//router.get('/', getUsers);
//router.get('/', createUser);
//router.delete('/', updateUser);


// GET PUT DELETE a single user: /api/users/:userId
// !!!!!!!!!!!!!!! don't forget BONUS: Remove a user's associated thoughts when deleted.!!!!!!!!!!!!!!!!!!!!
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


// ???????????????????????????????
// DELETE an user: /api/users/:userId
//router.route('/:userId').delete(deleteUser);
// PUT update an user: /api/users
//router.route('/').get(getUsers).put(updateUser);

// POST to add a new friend to a user's friend list or to DELETE /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
//??????????????????????????????????????????????????
// DELETE to remove a friend from a user's friend list /api/users/:userId/friends/:friendId
//router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
