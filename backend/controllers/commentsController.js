const allMyItineraries = require("../models/itinerariesmodels")

const commentsControllers = {

    addComment: async (req, res) => {
        const {itinerary,comment} = req.body
        const user = req.user._id
        try {
            const newComment = await allMyItineraries.findOneAndUpdate({_id:itinerary}, {$push: {comments: {comment: comment, userID: user}}}, {new: true}).populate("comments.userID", {firstName:1, lastName:1, imageUrl:1})
            res.json({ success: true, response:newComment, message:"gracias por dejarnos tu comentario" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos", error:error.message })
        }

    },
    modifiComment: async (req, res) => {
        const {comment} = req.body
        const user = req.user._id
        try {
            const editedComment = await allMyItineraries.findOneAndUpdate({"comments._id":req.params.id}, {$set: {"comments.$.comment": comment}}, {new: true})
            res.json({ success: true, response:editedComment, message:"tu comentario a sido modificado" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: true, message: "Algo a salido mal intentalo en unos minutos" })
        }

    },
    deleteComment: async (req, res) => {
        const id = req.params.id
        const user = req.user._id
        try {
            const deleteComment = await allMyItineraries.findOneAndUpdate({"comments._id":id}, {$pull: {comments: {_id: id}}}, {new: true})
        console.log(deleteComment)
            res.json({ success: true, response:deleteComment, message: "has eliminado el comentario" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos" })
        }

    },
    
}
module.exports = commentsControllers