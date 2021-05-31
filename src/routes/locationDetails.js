const router = require('express').Router();
const Location = require('../model/Location');

router.get("/:locationId", async (req, res) => {

    const loggedUser = req.session.user ? req.session.user : false

    const {locationId} = req.params;

    const location = await Location.findById(locationId);
    if(!location) return res.render('locationDetails', {message:"Location does not exist.",toast:true, loggedUser, location: false});

    const likes = location.interactions.filter((item) => item.interaction === "1")
    const unlikes = location.interactions.filter((item) => item.interaction === "0")
    
    res.render('locationDetails', {message:"", toast:false,  loggedUser, location: location, comments: location.comments, likes, unlikes});


});

router.post("/comments/:locationId", async (req, res) => {

    const { locationId } = req.params;

    const { comment } = req.body;

    const newComment = {
        authorId: req.session.user._id,
        author: req.session.user.firstName + " " + req.session.user.surName, 
        comment: comment
    }

    const updateComments = await Location.updateOne(
        {_id: locationId},
        {$push: {comments: newComment}}
    )

    const location = await Location.findById(locationId);
    if(!location) return res.status(400).json({error: "error"});

    return res.status(200).json(location.comments);
});

router.post("/interaction/:locationId", async (req, res) => {

    const { locationId } = req.params;

    const { authorId, interaction } = req.body;

    const location = await Location.findById(locationId);
    if(!location) return res.status(400).json({error: "error"});

    //Check if author has interact with this location
    const authorAlreadyInteract = location.interactions.find((item) => item.authorId == authorId);

    
    if(authorAlreadyInteract) {
        return res.status(200).json({error: "you can only interact once"});
    }

    const newInteraction = {
        authorId: authorId,
        interaction: interaction
    }

    const updateInteractions = await Location.updateOne(
        {_id: locationId},
        {$push: {interactions: newInteraction}}
    )

    location.interactions.push(newInteraction);

    const likes = location.interactions.filter((item) => item.interaction === "1")
    const unlikes = location.interactions.filter((item) => item.interaction === "0")

    return res.status(200).json({likes, unlikes});
});

module.exports = router;