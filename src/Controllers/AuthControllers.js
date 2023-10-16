const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../Config/Config');

module.exports = {
  login: async (req, res) => {
    console.log('login fired', req.body)
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
    console.log('password fired', user)

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // const isPasswordValid = await bcrypt.compare(password, user.password);

      let isPasswordValid = false;
      if(password == user.password){
        isPasswordValid =!isPasswordValid
    console.log('isPasswordValid fired', isPasswordValid)

      }
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const payload = {
        id: user.id,
        name: user.name,
      };
      const secretOrKey = "Maruti"

      jwt.sign(
        payload,
        secretOrKey,
        { expiresIn: 3600 },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
          });
        }
      );
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  logout: (req, res) => {
    // You can implement a logout mechanism here if needed.
    res.json({ message: 'Logout successful' });
  },
};
