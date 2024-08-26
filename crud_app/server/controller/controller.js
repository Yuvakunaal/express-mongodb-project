const Userdb = require('../model/model');

// create and save new user
exports.create = (req,res) => {
    // validate request
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    });

    // save user in database
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message : err.message || "Some error occurred while creating"});
        });
}

// retreive and return all users / retreive and return a single user
exports.find = (req,res) => {
    
}

// update a new identified user by user id
exports.update = (req,res) => {

}

// delete user with a specified user id
exports.delete = (req,res) => {

}