const db = require("../models");
const activityDb = db.activity;

exports.createActivity = async (req, res) => {
  const { email, title } = req.body;

  if (!title)
    return res.status(400).json({
      status: "Bad Request",
      message: "title cannot be null",
      data: {},
    });

  try {
    const result = await activityDb.create({
      email: email,
      title: title,
    });

    res.status(200).json({
      status: "Success",
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.getAllActivity = async (req, res) => {
  try {
    const result = await activityDb.findAll();

    res.status(200).json({
      status: "Success",
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.getIdActivity = async (req, res) => {
  const id = req.params.id;

  if (!id)
    return res.status(404).json({
      status: "Not Found",
      message: "ID Not Found",
      data: {},
    });
  try {
    const result = await activityDb.findByPk(id);

    if (!result)
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data: {},
      });

    res.status(200).json({
      status: "Success",
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.updateActivity = async (req, res) => {
  const { title } = req.body;
  const id = req.params.id;

  if (!title)
    return res.status(400).json({
      status: "Bad Request",
      message: "title cannot be null",
      data: {},
    });

  try {
    const update = await activityDb.update(
      {
        title: title,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (update == 0)
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data: {},
      });

    const result = await activityDb.findByPk(id);

    res.status(200).json({
      status: "Success",
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.deleteActivity = async (req, res) => {
  const id = req.params.id;

  try {
    const cekId = await activityDb.findByPk(id);

    if (!cekId)
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data: {},
      });

    await activityDb.destroy({
      where: { id: id },
    });

    res.status(200).json({
      status: "Success",
      message: "Success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
