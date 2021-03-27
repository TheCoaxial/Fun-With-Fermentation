module.exports = function (sequelize) {
    const Favorite = sequelize.define("Favorite", {});

    Favorite.associate = (models) => {
        Favorite.belongsTo(models.Brew);
        Favorite.belongsTo(models.User);

    };

    return Favorite;
}