const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const bcrypt = require('bcryptjs');

// Traer todos los usuarios
exports.getUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  return res.status(200).json({
    status: 'success',
    users,
  });
});

// Traer un usuario por id
exports.getUserById = catchAsync( async (req, res) => {
 
    const { user } = req;
    return res.status(200).json({
      status: 'success',
      user,
    });
  
});

// Crear un nuevo usuario
exports.createUsers = catchAsync(  async (req, res) => {

    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });

    const token = await generateJWT(user.id);

    return res.status(200).json({
      status: 'success',
      token,
      user,
    });

});

// Actualizar datos de un usuario
exports.updateUser = catchAsync( async (req, res) => {
  
    const { user } = req;
    const { name, email } = req.body;

    await user.update({ name, email });
    return res.status(200).json({
      status: 'success',
      message: 'User updated ✌️',
    });
 
});

// Eliminar por completo un usuario
exports.deleteUser = catchAsync( async (req, res) => {

    const { user } = req;

    await user.update({ status: 'disbaled' });
    return res.status(200).json({
      status: 'succes',
      message: 'User deleted ✌️',
    });
  
});

exports.login = catchAsync( async (req, res, next) => {
  const { user } = req;
  const { password } = req.body;

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'Incorrect email or password 😒',
    });
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    token,
    user,
  });
});
