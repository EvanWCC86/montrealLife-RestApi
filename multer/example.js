const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/'); 
    }, 
    filename: function(req, file, cb){
        cb(null, file.originalname); 
    }
}); 

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype == "image/jpg") {
      cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
  };

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5 
    }, 

    fileFilter: fileFilter
});
// REQUEST TO FIND USER BY ID AND ADD A PROFILE PICTURE 
router.put('/update/:id', upload.single('userImage'), (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        user.userImage = req.file.path || user.userImage,

        user 
            .save()
            .then(() => res.json("The User is UPDATED succesfully!"))
            .catch(err => res.status(400).json(`Error: ${err}`)); 
        }) 
    .catch(err => res.status(500).json(`Error: ${err}`));  
    console.log(req.body); 
    console.log(req.file); 

});
