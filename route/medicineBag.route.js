const router = require('express').Router();
let MedicineBag = require('../Models/medicineBag');

router.route('/').get((req, res) => {
    MedicineBag.find()
        .then(medicineBag => res.json(medicineBag))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
   
    const bagName = req.body.bagName;
    const bagConsist = req.body.bagConsist;
    
    
    const newMedicineBag = new MedicineBag({
        bagName,
        bagConsist
    });

    newMedicineBag.save()
        .then(() => res.json('medicineBag added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    MedicineBag.findById(req.params.id)
        .then(medicineBag => res.json(medicineBag))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    MedicineBag.findByIdAndDelete(req.params.id)
        .then(() => res.json('MedicineBag deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    MedicineBag.findById(req.params.id)
        .then(medicineBag => {
    
    
            medicineBag.bags_id = req.body.bags_id;
            medicineBag.bags_name = req.body.bags_name;
            medicineBag.bags_consist = req.body.bags_consist;
            medicineBag.bags_use=req.body.bags_use;
            medicineBag.bags_end_date = req.body.bags_end_date;

        

            medicineBag.save()
                .then(() => res.json("MedicineBag updated!"))
                .catch(err => res.status(r00).json('Error: ' + err));
        })
        .catch(err => res.status(r00).json('Error : ' + err));
});

module.exports = router;