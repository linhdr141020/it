import pool from "../configs/connectDB";

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

module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser
};
