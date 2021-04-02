module.exports = function (sequelize) {
    const Follow = sequelize.define("Follow", {});

    Follow.associate = (models) => {
        Follow.belongsTo(models.User);
    };

    return Follow;
}