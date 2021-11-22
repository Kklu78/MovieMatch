const express = require('express');
const router = express.Router();
const friendsCtrl = require('../../controllers/friends');

/*---------- Public Routes ----------*/
router.get('/all', friendsCtrl.getAllFriends);
router.get('/:friendId/status', friendsCtrl.getFriends);
router.post('/:friendId/request', friendsCtrl.friendRequest);
router.post('/:friendId/accept', friendsCtrl.acceptRequest);
router.delete('/:friendId/reject', friendsCtrl.rejectRequest);

/*---------- Protected Routes ----------*/




module.exports = router;