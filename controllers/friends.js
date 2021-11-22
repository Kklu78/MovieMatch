const User = require('../models/user');
const Friend = require('../models/friend')


module.exports = {
    friendRequest,
    acceptRequest,
    rejectRequest,
    getFriends,
    getAllFriends
  };


async function friendRequest(req, res) {
  
    try {

    const docA = await Friend.findOneAndUpdate(
        { requester: req.user._id, recipient: req.params.friendId },
        { $set: { status: 1 }},
        { upsert: true, new: true }
    )
    const docB = await Friend.findOneAndUpdate(
        { recipient: req.user._id, requester: req.params.friendId },
        { $set: { status: 2 }},
        { upsert: true, new: true }
    )
    const updateUserA = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { friends: docA._id }}
    )
    const updateUserB = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $push: { friends: docB._id }}
    )
      res.status(201).json({ data: 'friend request sent' });
    } catch (err) {
      res.status(400).json({ err });
    }
  }

  async function acceptRequest(req, res) {

      try {

        const updateUserA = await Friend.findOneAndUpdate(
            { requester: req.user._id, recipient: req.params.friendId },
            { $set: { status: 3 }}
        )

        const updateUserB = await Friend.findOneAndUpdate(
            { requester: req.params.friendId, recipient: req.user._id },
            { $set: { status: 3 }}
        )

        res.status(201).json({ data: 'friend request accepted' });

      } catch (err) {
            res.status(400).json({ err });
      }
  }

  async function rejectRequest(req, res) {

    try {

        const docA = await Friend.findOneAndRemove(
            { requester: req.user._id, recipient: req.params.friendId }
        )
        const docB = await Friend.findOneAndRemove(
            { requester: req.params.friendId, recipient: req.user._id }
        )
        const updateUserA = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $pull: { friends: docA._id }}
        )
        const updateUserB = await User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $pull: { friends: docB._id }}
        )

      res.status(201).json({ data: 'friend request rejected' });

    } catch (err) {
          res.status(400).json({ err });
    }
}

async function getFriends(req, res) {


    try {
        const friends = await Friend.find({ requester: req.user._id, recipient: req.params.friendId })
        res.status(201).json({ friends: friends });
    } catch (err) {
        res.status(400).json({ err });
    }
}

async function getAllFriends(req, res) {

    try {
        const friends = await Friend.find({ requester: req.user._id, status: '3' })
        console.log(friends, 'getallfriends')
        res.status(201).json({ friends: friends });
    } catch (err) {
        res.status(400).json({ err });
    }
}



