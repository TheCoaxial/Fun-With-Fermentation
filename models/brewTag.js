module.exports = function(sequelize) {
    const BrewTags = sequelize.define("BrewTags", {});
    BrewTags.associate = models => {
        BrewTags.belongsTo(models.Brew);
        BrewTags.belongsTo(models.Tag);
    };
    return BrewTags;
};