const db = require("../models");
const todoDb = db.todo;

exports.createTodo = async (req, res) => {
  const { activity_group_id, title } = req.body;

  if (!title || !activity_group_id)
    return res.status(400).json({
      status: "Bad Request",
      message: `${!title ? "title" : "activity_group_id"} cannot be null`,
      data: {},
    });

  try {
    const result = await todoDb.create({
      activity_group_id: activity_group_id,
      title: title,
      is_active: true,
      priority: "very-high",
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

exports.getAllTodo = async (req, res) => {
  const activity_group_id = req.query.activity_group_id;

  const where = activity_group_id
    ? {
        where: {
          activity_group_id: activity_group_id,
        },
      }
    : {};
  try {
    const result = await todoDb.findAll(where);

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

exports.getIdTodo = async (req, res) => {
  const id = req.params.id;

  if (!id)
    return res.status(404).json({
      status: "Not Found",
      message: "ID Not Found",
      data: {},
    });
  try {
    const result = await todoDb.findByPk(id);

    if (!result)
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
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

exports.updateTodo = async (req, res) => {
  const { title, is_active } = req.body;
  const id = req.params.id;

  if (!title && is_active === undefined)
    return res.status(404).json({
      status: "Not Found",
      message: `Todo with title and is_active Not Found`,
      data: {},
    });

  try {
    const dataUpdate =
      title && is_active !== undefined
        ? { is_active: is_active, title: title }
        : title
        ? { title: title }
        : { is_active: is_active };

    const update = await todoDb.update(dataUpdate, {
      where: {
        id: id,
      },
    });
    console.log(update);

    if (update == 0)
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
        data: {},
      });

    const result = await todoDb.findByPk(id);

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

exports.deleteTodo = async (req, res) => {
  const id = req.params.id;

  try {
    const cekId = await todoDb.findByPk(id);

    if (!cekId)
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
        data: {},
      });

    await todoDb.destroy({
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
