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
router.route('/').get(getUsers).post(createUser).put(updateUser);


// POST create a new user: /api/users
// router.route('/').post(createUser);
// PUT update an user: /api/users
//router.route('/').get(getUsers).put(updateUser);

//?????????? Instead of: ???????????????????
//router.get('/', getUsers);
//router.get('/', createUser);
//router.delete('/', updateUser);


// GET a single user: /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);
// ???????????????????????????????
// DELETE an user: /api/users/:userId
//router.route('/:userId').delete(deleteUser);

// POST to add a new friend to a user's friend list or to DELETE /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
//??????????????????????????????????????????????????
// DELETE to remove a friend from a user's friend list /api/users/:userId/friends/:friendId
//router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
