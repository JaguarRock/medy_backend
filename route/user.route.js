const router = require('express').Router();
let User = require('../models/user');

router.route('/').get((req, res) => {
    User.find()
        .then(user=>res.json(user))   
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

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    User.findById(req.params.id)
        .then(user => {
            user.users_id = req.body.users_id;
            user.users_email = req.body.users_email;
            user.users_name = req.body.users_name;
            user.users_password = req.body.users_password;

            user.save()
                .then(() => res.json('User updated.'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;


//users_id, users_email, users_name, users_password