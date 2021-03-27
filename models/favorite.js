module.exports = function (sequelize) {
    const Favorite = sequelize.define("Favorite", {});

    Favorite.associate = (models) => {
        // Favorite.hasMany(models.Brew);
        // Favorite.hasMany(models.User);
    };

    return Favorite;
}