const allMyItineraries = require("../models/itinerariesmodels")

const commentsControllers = {

    addComment: async (req, res) => {
        const {itinerary,comment} = req.body
        const user = req.user._id
        try {
            const newComment = await allMyItineraries.findOneAndUpdate({_id:itinerary}, {$push: {comments: {comment: comment, userID: user}}}, {new: true})
            .populate("comments.userID", {firstName:1, lastName:1, imageUrl:1})
            res.json({ success: true, response:newComment, message:"thanks for your comment!" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "something went wrong try again later", error:error.message })
        }

    },

    
    modifiComment: async (req, res) => {
        const {comment} = req.body
        const user = req.user._id
        try {
            const editedComment = await allMyItineraries.findOneAndUpdate({"comments._id":req.params.id}, {$set: {"comments.$.comment": comment}}, {new: true})
            res.json({ success: true, response:editedComment, message:"Your comment has been modified!" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: true, message: "something went wrong try again later" })
        }

    },
    deleteComment: async (req, res) => {
        const id = req.params.id
        const user = req.user._id
        try {
            const deleteComment = await allMyItineraries.findOneAndUpdate({"comments._id":id}, {$pull: {comments: {_id: id}}}, {new: true})
        console.log(deleteComment)
            res.json({ success: true, response:deleteComment, message: "Your comment has been deleted" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "something went wrong try again later" })
        }

    },
    
}
module.exports = commentsControllers