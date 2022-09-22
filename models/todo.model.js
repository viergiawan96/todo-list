module.exports = (sequelize, Sequelize) => {
  const todo = sequelize.define(
    "todo",
    {
      activity_group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      is_active: {
        type: Sequelize.BOOLEAN,
      },
      priority: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return todo;
};
