const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })

router.get('/', (req, res) => {
    res.send('api route')
})

router.post('/', async (req, res) => {
    res.json({
        fields: req.fields,
        files: req.files,
    });
})

module.exports = router;