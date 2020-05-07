const router = require('express').Router();
let User = require('../models/user');

router.route('/').get((req, res) => {
    User.find()
        .then(users=>res.json(users))
        .catch(err=> res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{
    const users_id = req.body.users_id;
    const users_email = req.body.users_email;
    const users_name = req.body.users_name;
    const users_password = req.body.users_password;

    const newUser = new User({
        users_id,
        users_email,
        users_name,
        users_password
    });

    newUser.save()
    .then(()=>res.json('User added'))
    .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;


//users_id, users_email, users_name, users_password