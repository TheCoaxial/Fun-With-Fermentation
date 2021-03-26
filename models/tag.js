module.exports = function (sequelize, DataTypes) {
    const Tag = sequelize.define("Tag", {
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

    //throws error Add associations on fundemental components first and build outward

    Tag.associate = (models) => {
        Tag.belongsToMany(models.Brew, { through: 'BrewTags' });
    };

    return Tag;
};