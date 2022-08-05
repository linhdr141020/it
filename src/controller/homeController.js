import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
  let data = [];
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs",{dataUser: rows, abc: 'test123'});
};

let getDetailPage = async (req, res) => {
  let userId = req.params.userId
  let [user] = await pool.execute("SELECT * FROM `users` WHERE id = ?",[userId])

  return res.send(JSON.stringify(user))
}

module.exports = {
  getHomePage,
  getDetailPage
};
