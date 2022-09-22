module.exports = (sequelize, Sequelize) => {
  const activity = sequelize.define(
    "activity",
    {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      title: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      deletedAt: "destroyTime",
    }
  );
  return activity;
};
