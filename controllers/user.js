const dbclient = require("../db/connect");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { user_name, password, phone, address } = req.body;
  const { rows } = await dbclient.query(
    "INSERT INTO users(user_name, email, password, role, fullname, phone, address) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [user_name, password, phone, address]
  );

  res.status(200).send("created");
};

const getUserById = async (req, res) => {
  const user_id = req.params.user_id;
  dbclient.query(
    "SELECT * FROM users WHERE user_id = $1",
    [user_id],
    (err, response) => {
      if (err) {
        console.log(error);
        res.status(500).json("error");
      } else {
        res.status(200).json(response.rows[0]);
      }
    }
  );
};

const loginUser = async (req, res) => {
  const { user_name, password } = req.body;
  //console.log(req.body);
  dbclient.query(
    "SELECT * FROM users WHERE user_name = $1",
    [user_name],
    (err, response) => {
      if (response.rowCount === 0) {
        res.status(500).json("Enter valid username");
      } else if (response.rows[0].password == password) {
        const token = jwt.sign(
          {
            user_name: user_name,
            role: response.rows[0].role,
            user_id: response.rows[0].user_id,
          },
          "thisismysecretkey"
        );
        res.status(200).json({
          access_token: token,
          role: response.rows[0].role,
        });
      } else if (err) {
        res.status(505).json(err);
      } else {
        res.status(400).json("not authorized");
      }
    }
  );
};
module.exports = {
  registerUser,
  getUserById,
  loginUser,
};
