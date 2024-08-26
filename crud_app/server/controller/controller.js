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
            // res.send(data);
            res.redirect("/");
        })
        .catch(err => {
            res.status(500).send({message : err.message || "Some error occurred while creating"});
        });
}

// retreive and return all users / retreive and return a single user
exports.find = (req,res) => {
    if (req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data => {
            if (!data){
                res.status(400).send({message:`Not found user with id = ${id}`});
            }
            else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message : err.message});
        })
    }
    else{
        Userdb.find()
                .then(user => {
                    res.send(user);
                })
                .catch(err => {
                    res.status(500).send({message:err.message || "Error occurred while retreiving user information "})
                })
    }
}

// update a new identified user by user id
exports.update = (req,res) => {
    if (!req.body){
        res.status(400).send({message:"Data to update cannot be empty"});
        return;
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{ useFindAndModify : false })
    .then(data => {
        if (!data){
            res.status(400).send({message :`Cannot update user with ${id}. Maybe user not found.`})
        }
        else{
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({message : err.message || "Error : update user information"});
    })
}

// delete user with a specified user id
exports.delete = (req,res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data => {
        if (!data){
            res.status(400).send({message : `Cannot delete with id ${id}. Maybe invalid id.`});
        }
        else{
            res.send({message : "User was deleted successfully."});
        }
    })
    .catch(err => {
        res.status(500).send({message : `Could not delete user with id = ${id}`});
    })
}