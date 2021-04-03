module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 20]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            validate: {
                len: [0, 500]
            }
        },
        contributionScore: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },

    });

    User.associate = (models) => {
        User.hasMany(models.Comment, { onDelete: 'cascade' });
        User.hasMany(models.Brew, { onDelete: 'cascade' });
        User.belongsToMany(models.Brew, { through: models.Favorite });
        User.belongsToMany(models.Comment, { through: models.CommentLike });

        User.belongsToMany(models.User, { through: models.Follow, as: "Follower", foreignKey: 'follower', onDelete: 'cascade' });
        User.belongsToMany(models.User, { through: models.Follow, as: 'Followering', foreignKey: 'following', onDelete: 'cascade' });
    };

    User.prototype.incrementContributionScore = (num) => {
        this.contributionScore += num;
    };

    return User;

};