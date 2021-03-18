module.exports = function(sequelize, DataTypes) {
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

    Tag.associate = (models) => {
        Tag.belongsToMany(models.Brew);
    };

    return Tag;
};