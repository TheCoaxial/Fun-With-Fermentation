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
            allowNull: false,
            validate: {
                len: [0, 40]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            validate: {
                len: [0, 500]
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    Brew.associate = (models) => {
        Brew.hasMany(models.Ingredient, { onDelete: 'cascade' });
        Brew.hasMany(models.Comment, { onDelete: 'cascade' });
        Brew.hasMany(models.Step, { onDelete: 'cascade' });
        Brew.belongsTo(models.User);
        Brew.belongsToMany(models.User, { through: models.Favorite });
        Brew.belongsToMany(models.Tag, { through: 'BrewTags' });
    };

    Brew.prototype.totalDuration = () => {
        return Brew.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('duration')), 'totalDuration']],
            include: [{ model: Step }],
            raw: true
        });
    };

    return Brew;
};
