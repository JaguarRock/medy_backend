const router = require('express').Router();
let hospital = require('../models/hospital');

router.route('/').get((req, res) => {
    hospital.find()
        .then(hospital => res.json(hospital))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const hospital_id = req.body.hospital_id;
    const hospital_password = req.body.hospital_password;
    const hospital_name = req.body.hospital_name;
    const hospital_doctor_name = req.body.hospital_doctor_name;
    const hospital_address = req.body.hospital_address;
    const hospital_phone_num = req.body.hospital_phone_num;
    const hospital_kinds = req.body.hospital_kinds;
    const hospital_operating_time = req.body.hospital_operating_time;
    const hospital_user_email = req.body.hospital_user_email;

    
    

    const newHospital = new hospital({
        hospital_id,
        hospital_password,
        hospital_name,
        hospital_doctor_name,
        hospital_address,
        hospital_phone_num,
        hospital_kinds,
        hospital_operating_time,
        hospital_user_email
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
