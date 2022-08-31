const express = require('express');
const router = express.Router();
const multer = require('../helper/multer').array('image');
const { postFiles, getFileData } = require('../controllers/uploads');

router.post('/uploads', multer, postFiles );
router.get('/uploads', getFileData );
router.delete('/uploads', (req, res)=>{});

module.exports = router