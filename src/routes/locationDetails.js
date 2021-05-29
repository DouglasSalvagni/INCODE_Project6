const router = require('express').Router();

const mockupLocation = {
    _id:"60ae235368cbb25041f7be5e",
    title:"New York",
    description: "Curabitur ornare neque dolor, sit amet convallis arcu rutrum ut. Nam a dolor volutpat, semper lorem ac, dictum neque. Nam non hendrerit elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    author: "Fulano",
}



const mockupLocationComments = [
    {
        _id:"90ae235368cbb25041f7be5e",
        locationId: "60ae235368cbb25041f7be5e",
        authorId: "60ae235368cbb25041f7be5c",
        author:"Michael Costa",
        comment: "Nam a dolor volutpat, semper lorem ac, dictum neque. Nam non hendrerit elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    },
    {
        _id:"20ae235368cbb25041f7be5e",
        locationId: "60ae235368cbb25041f7be5e",
        authorId: "60ae235368cbb25041f7be5y",
        author:"Ronald Mc'Donnald",
        comment: "Semper lorem ac, dictum neque. Nam non hendrerit elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    }
]

router.get("/:locationId", (req, res) => {

    const loggedUser = req.session.user ? req.session.user : false

    const {locationId} = req.params;
    
    res.render('locationDetails', {toast:false, message:"", loggedUser, location: mockupLocation, comments: mockupLocationComments});


});

router.post("/comments", (req, res) => {

    const { comment } = req.body;

    mockupLocationComments.push({
        _id:"20ae235368cbb25041f7be5e",
        locationId: "60ae235368cbb25041f7be5e",
        authorId: "60ae235368cbb25041f7be5y",
        author:"Ronald Mc'Donnald",
        comment: comment,
    })
    setTimeout(()=>{

        return res.status(200).json(mockupLocationComments)
    },2000)
});

module.exports = router;