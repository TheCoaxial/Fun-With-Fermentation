module.exports = function (sequelize, DataTypes) {
    const Ingredient = sequelize.define("Ingredient", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [2, 50]
            }
        }
    });

    Ingredient.associate = (models) => {
        Ingredient.belongsTo(models.Brew);
    };

    return Ingredient;
};