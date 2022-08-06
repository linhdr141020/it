import pool from "../configs/connectDB";
import multer from 'multer';


let getHomePage = async (req, res) => {
  let data = [];
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs",{dataUser: rows, abc: 'test123'});
};

let getDetailPage = async (req, res) => {
  let userId = req.params.userId
  let [user] = await pool.execute("SELECT * FROM `users` WHERE id = ?",[userId])

  return res.render(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
  let {firstName, lastName,address,email} = req.body;
  await pool.execute("INSERT INTO users (firstName,lastName,email,address) VALUES (?, ?, ?, ?)",
  [firstName, lastName,email,address])
  return res.redirect('/')
}

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("DELETE FROM users WHERE id=?",[userId])
  return res.redirect('/')
}

let getEditPage = async (req, res) => {
  let id  = req.params.id;
  const [user, fields] = await pool.execute("SELECT * FROM `users` WHERE id=?",[id]);
  return res.render('update.ejs',{dataUser: user[0]})
}

let postUpdateUser = async (req, res) => {
  let {firstName, lastName,address,email,id} = req.body;
  await pool.execute("UPDATE users SET firstName = ?,lastName = ?,email = ?,address = ? WHERE id= ?",
  [firstName, lastName,email,address,id])
  return res.redirect('/')
}

let getUploadFilePage = async (req, res) => {
  res.render('uploadFile.ejs')
}

const upload = multer().single('profile_pic');

let handleUploadFile = async (req, res) => {
  upload(req, res, function(err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
        return res.send(err);
    }
    else if (err) {
        return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
});
}

const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
exports.imageFilter = imageFilter;

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  postUpdateUser,
  getUploadFilePage,
  handleUploadFile
};
