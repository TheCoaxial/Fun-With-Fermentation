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
            validate: {
                len: [2, 50]
            }
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        quantityUnits: {
            type: DataTypes.STRING
        }
    });

    Ingredient.associate = (models) => {
        Ingredient.belongsTo(models.Brew);
    };

    return Ingredient;
};