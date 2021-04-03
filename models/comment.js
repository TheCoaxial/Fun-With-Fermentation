module.exports = function(sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            length: "long",
            allowNull: false,
            validate:{
                len:[1,200]
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Brew);
        Comment.belongsToMany(models.User, { through: models.CommentLike });
        Comment.belongsToMany(models.Comment, { through: models.CommentReply, as: 'Parent', foreignKey: 'parent', onDelete: 'cascade' });
        Comment.belongsTo(models.Comment, { through: models.CommentReply, as: 'Child', foreignKey: 'child', onDelete: 'cascade' });
    };
    
    return Comment;
};