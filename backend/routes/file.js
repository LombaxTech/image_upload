const express = require('express');
const router = express.Router();
const fs = require('fs');
const formidable = require('formidable');
const Person = require('../models/person');

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })

router.get('/', (req, res) => {
    res.send('api route')
})

router.post('/', async (req, res) => {

    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) return res.json({ err });
        return res.json({
            name: fields.name,
            files
        })
    });


    res.json({
        fields,
        name,
        files,
        fsVer: fs.readFileSync(files.avatar.path)
    });
})

router.post('/person', async (req, res) => {

    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        if (err) return res.json({ err });
        let person = new Person({
            name: fields.name
        });
        person.avatar.data = fs.readFileSync(files.avatar.path);
        person.avatar.contentType = files.avatar.type;
        // return res.json({ person })

        try {
            person = await person.save();
            res.json({ success: true, person });
        } catch (error) {
            return res.json({ error });
        }
    })

})

router.get('/person/:name', async (req, res) => {
    let { name } = req.params;
    try {
        let person = await Person.findOne({ name });
        if (!person) return res.status(400).json({ error: 'person not found' });
        return res.json(person);
    } catch (error) {
        return res.json({ error })
    }

})

module.exports = router;