module.exports = function(sequelize, DataTypes) {
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
            unique: true
        }
    });

    return Ingredient;
};