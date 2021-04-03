module.exports = function (sequelize, DataTypes) {
    const Rating = sequelize.define("Rating", {
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true,
                max: 5,
                min: 0
            }
        }
    });

    Rating.associate = (models) => {
        Rating.belongsTo(models.Brew);
        Rating.belongsTo(models.User);
    };

    return Rating;
}