module.exports = function (sequelize) {
    const CommentLike = sequelize.define("CommentLike", {});

    CommentLike.associate = models => {
        CommentLike.belongsTo(models.Comment);
        CommentLike.belongsTo(models.User);
    }
    
    return CommentLike;
}