module.exports = function (sequelize) {
    const Follow = sequelize.define("Follow", {});

    Follow.associate = (models) => {
        Follow.belongsTo(models.User, { foreignKey: 'following', as: 'Following' });
        Follow.belongsTo(models.User, { foreignKey: 'follower', as: 'Follower' });
    };

    return Follow;
}