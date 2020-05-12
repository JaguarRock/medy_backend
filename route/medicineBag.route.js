const router = require('express').Router();
let MedicineBag = require('../Models/medicineBag');

router.route('/').get((req, res) => {
    MedicineBag.find()
        .then(medicineBag => res.json(medicineBag))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const id = req.body.id;
    const bagName = req.body.bagName;
    const bagConsist = req.body.bagConsist;

    const newMedicineBag = new MedicineBag({
        id,
        bagName,
        bagConsist,
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
            medicineBag.id = req.body.id;
            medicineBag.bagName = req.body.bagName;
            medicineBag.bagConsist = req.body.bagConsist;

            medicineBag.save()
                .then(() => res.json("MedicineBag updated!"))
                .catch(err => res.status(r00).json('Error: ' + err));
        })
        .catch(err => res.status(r00).json('Error: ' + err));
});

module.exports = router;
