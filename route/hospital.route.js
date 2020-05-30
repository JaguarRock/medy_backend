const router = require('express').Router();
let hospital = require('../models/hospital');

router.route('/').get((req, res) => {
    hospital.find()
        .then(hospital => res.json(hospital))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;
    const doctor = req.body.doctor;
    const address = req.body.address;
    const phoneNum = req.body.phoneNum;
    const kinds = req.body.kinds;
    const email = req.body.email;

    const newHospital = new hospital({
        name,
        id,
        password,
        doctor,
        address,
        phoneNum,
        kinds,
        email
    });

    newHospital.save()
        .then(() => res.json('hospital added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

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
            hospital.hospital_doctor_name=req.body.hospital_doctor_name;
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
