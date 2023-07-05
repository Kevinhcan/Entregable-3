const Repair = require('../models/repair.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

// Traer todas las reparaciones pendientes
exports.getRepairs = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: ['pending', 'completed'],
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  return res.status(200).json({
    status: 'succes',
    repairs,
  });
});

// Traer una reparación pendiente por id
exports.getRepairById = catchAsync(async (req, res) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'succes',
    repair,
  });
});

// Crear una cita nueva
exports.createRepair = catchAsync(async (req, res) => {
  const { date, userId, description, motorsNumber } = req.body;

  const repair = await Repair.create({
    date,
    userId,
    description,
    motorsNumber,
  });

  return res.status(200).json({
    status: 'succes',
    repair,
  });
});

// Actualizar el estado de una reparación a completado
exports.update = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: 'completed',
  });

  return res.status(200).json({
    status: 'succes',
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({
    status: 'canceled',
  });

  return res.status(200).json({
    status: 'succes',
    message: 'repair deleted ➖',
  });
});
