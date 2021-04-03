module.exports = function (sequelize) {
    const CommentReply = sequelize.define("CommentReply", {});

    CommentReply.associate = (models) => {
        CommentReply.belongsTo(models.User, { foreignKey: 'parent', as: 'Parent' });
        CommentReply.hasMany(models.User, { foreignKey: 'child', as: 'Child' });
    };

    return CommentReply;
}