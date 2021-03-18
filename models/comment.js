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
            allowNull: false
        }
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Brew);
        Comment.belongsTo(models.User);
    };
    
    return Comment;
};

// add hasMany to brew and user models to associate comments with users/brews