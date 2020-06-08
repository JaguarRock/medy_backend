const router = require('express').Router();
const hospital = require('../models/hospital');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

router.get('/', (req, res) => {
    hospital.find()
        .then(hospital => res.json(hospital))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post(async (req, res) => {
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const idExist = await hospital.findOne({ id: req.body.id });
    if (idExist) return res.status(400).send('ID already exists');

    //Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Create New user
    const Hospital = new hospital({
        id: req.body.id,
        password: hashedPassword,
        name: req.body.name,
        doctor: req.body.doctor,
        address: req.body.address,
        phoneNum: req.body.phoneNum,
        kinds: req.body.kinds,
        email: req.body.email
    });

    // try {
    //     await Hospital.save();
    //     console.log('hospital reigstered');
    // } catch (err) {
    //     res.status(400).send(err);
    // }
    Hospital.save()
        .then(() => res.json('medicineBag added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/login').post(async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the ID exists
    const user = await hospital.findOne({ id: req.body.id });
    if (!user) return res.status(400).send('ID is not found');

    // Password is Correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password')

    //Create and assign a token
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    res.header("x-access-token", token).send(user);

})

router.route('/:id').get((req, res) => {
    hospital.findById(req.params.id)
        .then(hospital => res.json(hospital))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    hospital.findByIdAndDelete(req.params.id)
        .then(() => res.json('hospital deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    hospital.findById(req.params.id)
        .then(hospital => {
            hospital.hospital_id = req.body.hospital_id;
            hospital.hospital_password = req.body.hospital_password;
            hospital.hospital_name = req.body.hospital_name;
            hospital.hospital_doctor_name = req.body.hospital_doctor_name;
            hospital.hospital_address = req.body.hospital_address;
            hospital.hospital_phone_num = req.body.hospital_phone_num;
            hospital.hospital_kinds = req.body.hospital_kinds;
            hospital.hospital_operating_time = req.body.hospital_operating_time;
            hospital.hospital_user_email = req.body.hospital_user_email;

            hospital.save()
                .then(() => res.json("hospital updated!"))
                .catch(err => res.status(r00).json('Error: ' + err));
        })
        .catch(err => res.status(r00).json('Error : ' + err));
});

module.exports = router;
