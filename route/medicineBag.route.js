const router = require('express').Router();
let MedicineBag = require('../Models/medicineBag');

router.route('/').get((req, res) => {
    MedicineBag.find()
        .then(medicineBag => res.json(medicineBag))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const bag_id = req.body.bag_id;
    const bag_name = req.body.bag_name;
    const bag_consist = Number(req.body.bag_consist);

    const newMedicineBag = new MedicineBag({
        bag_id,
        bag_name,
        bag_consist,
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
            medicineBag.bag_id = req.body.bag_id;
            medicineBag.bag_name = req.body.bag_name;
            medicineBag.bag_consist = Number(req.body.bag_consist);

            medicineBag.save()
                .then(() => res.json("MedicineBag updated!"))
                .catch(err => res.status(r00).json('Error: ' + err));
        })
        .catch(err => res.status(r00).json('Error: ' + err));
});

module.exports = router;
