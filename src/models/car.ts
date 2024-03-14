// models/Car.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database"; // Importing sequelize from your config file

class Car extends Model {
  public car_id!: number;
  public car_name!: string;
  public day_rate!: number;
  public month_rate!: number;
  public image!: string;
}

Car.init(
  {
    car_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    car_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    day_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    month_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Car",
    tableName: "cars",
    timestamps: false, // If you don't want Sequelize to automatically add createdAt and updatedAt fields
  }
);

export default Car;
