const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'user',
    {
        user_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstname: {
          type: Sequelize.STRING,
          required: true
        },
        lastname: {
          type: Sequelize.STRING,
          required: true
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          required: true,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          required: true,
          allowNull: false,
          len: [8, 21]
        },
        secret: {
          type: Sequelize.STRING,
          required: true,
          allowNull: false
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)