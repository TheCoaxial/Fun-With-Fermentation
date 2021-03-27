module.exports = function(sequelize) {
    const BrewTags = sequelize.define("BrewTags", {});
    BrewTags.associate = models => {
        BrewTags.hasMany(models.Brew);
        BrewTags.hasMany(models.Tag);
    };
    return BrewTags;
};