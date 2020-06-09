const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

router.get('/', async (req, res) => {
    res.send('got');
})

router.post('/', async (req, res) => {

    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) return res.json({ err });
        let { avatar } = files;

        cloudinary.uploader.upload(avatar.path, (err, result) => {
            if (err) return res.json({ err });
            return res.json({ success: true, result });
        })

        // return res.json({
        //     avatar
        // })
    });

})

module.exports = router;