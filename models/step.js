module.exports = function (sequelize, DataTypes) {
    const Step = sequelize.define("Step", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        // add duration units
        instructions: {
            type: DataTypes.TEXT,
            length: "long",
            allowNull: false
        }
    });

    Step.associate = models => {
        Step.belongsTo(models.Brew);
    };

    return Step;
};