var express = require('express');
var router = express.Router();
let userSchema = require('../models/users');
let userController = require('../controllers/users')
let BuildQueries = require('../Utils/BuildQuery');
<<<<<<< HEAD
let { check_authentication,
  check_authorization } = require('../Utils/check_auth')
let constants = require('../Utils/constants')
let { validators, validator_middleware } = require('../Utils/validator')
let multer = require('multer')
let path = require('path')
let URLCDN_post = "http://localhost:4000/upload";
let axios = require('axios');
let FormData = require('form-data');
let fs = require('fs');
const { header } = require('express-validator');

router.get('/', async function (req, res, next) {
=======
let {check_authentication,
  check_authorization} = require('../Utils/check_auth')
let constants = require('../Utils/constants')

router.get('/', async function(req, res, next) {
>>>>>>> 48d098df68c7c943470ec4fab3e8c639c2fd98d7
  let queries = req.query;
  let users = await userSchema.find(BuildQueries.QueryUser(queries)).populate('role');
  res.send(users);
});

<<<<<<< HEAD
router.get('/:id', check_authentication, async function (req, res, next) {
  try {
    if (req.user._id == req.params.id) {
=======
router.get('/:id',check_authentication, async function(req, res, next) {
  try {
    if(req.user._id==req.params.id){
>>>>>>> 48d098df68c7c943470ec4fab3e8c639c2fd98d7
      let user = await userSchema.findById(req.params.id).populate('role');
      res.status(200).send({
        success: true,
        data: user
      });
<<<<<<< HEAD
    } else {
      throw new Error("ban khong co quyen")
    }
=======
    }else{
      throw new Error("ban khong co quyen")
    } 
>>>>>>> 48d098df68c7c943470ec4fab3e8c639c2fd98d7
  } catch (error) {
    next(error)
  }
});

<<<<<<< HEAD
router.post('/',
  check_authentication,
  check_authorization(constants.MOD_PERMISSION),
  validators, validator_middleware,
  async function (req, res, next) {
    try {
      let body = req.body;
      let result = await userController.createUser(
        body.username,
        body.password,
        body.email,
        body.role
      )
      res.status(200).send({
        success: true,
        data: result
      })
    } catch (error) {
      next(error);
    }

  });

router.put('/:id', async function (req, res, next) {
=======
router.post('/',check_authentication,
check_authorization(constants.MOD_PERMISSION),async function(req, res, next) {
  try {
    let body = req.body;
        let result = await userController.createUser(
          body.username,
          body.password,
          body.email,
          body.role
        )
        res.status(200).send({
          success:true,
          data:result
        })
  } catch (error) {
    next(error);
  }
  
});

router.put('/:id', async function(req, res, next) {
>>>>>>> 48d098df68c7c943470ec4fab3e8c639c2fd98d7
  try {
    let body = req.body;
    let user = await userSchema.findById(
      req.params.id
    ).populate({
<<<<<<< HEAD
      path: "role", select: "roleName"
    });
    if (user) {
      let allowField = ["password", "email", "fullName", "avatarUrl"];
      for (const key of Object.keys(body)) {
        if (allowField.includes(key)) {
=======
      path:"role",select:"roleName"
    });
    if(user){
      let allowField=["password","email","fullName","avatarUrl"];
      for (const key of Object.keys(body)) {
        if(allowField.includes(key)){
>>>>>>> 48d098df68c7c943470ec4fab3e8c639c2fd98d7
          user[key] = body[key]
        }
      }
      await user.save();
      res.status(200).send({
        success: true,
        data: user
      });
<<<<<<< HEAD
    }
=======
    }  
>>>>>>> 48d098df68c7c943470ec4fab3e8c639c2fd98d7
  } catch (error) {
    next(error)
  }
});

<<<<<<< HEAD
let avatarDir = path.join(__dirname, '../avatars')
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, avatarDir),
  filename: (req, file, cb) => cb(null,
    (new Date(Date.now())).getTime() + "-" + file.originalname
  ),
})
let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/image/)) {
      return cb(new Error('loi'));
    }
    //console.log("hehehe");
    cb(null, true);
  }, limits: {
    fileSize: 5 * 1024 * 1024
  }
})
router.post('/change_avatar', check_authentication, upload.single('avatar'), async function (req, res, next) {
  if (!req.file) {
    res.status(404).send({
      success: false,
      message: "file khong ton tai"
    })
  } else {
    let formData = new FormData();
    let filePath = path.join(avatarDir, req.file.filename)
    formData.append('avatar', fs.createReadStream(filePath));
    let result = await axios.post(
      URLCDN_post, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(result.data.url);
    fs.unlinkSync(filePath)
    let url = result.data.url;
    req.user.avatarUrl= url;
    await req.user.save()
    res.status(200).send({
      success:true,
      message:req.user
    })
  }
})
router.get("/avatars/:filename", function (req, res, next) {
  let filename = req.params.filename;
  let fileDir = path.join(avatarDir, filename);
  res.sendFile(fileDir);
})

=======
>>>>>>> 48d098df68c7c943470ec4fab3e8c639c2fd98d7
module.exports = router;