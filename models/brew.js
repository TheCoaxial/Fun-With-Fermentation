module.exports = function (sequelize, DataTypes) {
    const Brew = sequelize.define("Brew", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    Brew.associate = (models) => {
        Brew.hasMany(models.Ingredient);
        Brew.hasMany(models.Comment);
        Brew.belongsTo(models.User);
        Brew.belongsToMany(models.User, { through: 'Favorites' });
    };

    return Brew;
};
