// models/Order.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database"; // Assuming you have a file for configuring Sequelize
import Car from "./car"; // Importing Car model to establish a foreign key relationship

class Order extends Model {
  public order_id!: number;
  public car_id!: number;
  public order_date!: Date;
  public pickup_date!: Date;
  public dropoff_date!: Date;
  public pickup_location!: string;
  public dropoff_location!: string;
}

Order.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Car,
        key: "car_id",
      },
    },
    order_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    pickup_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dropoff_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    pickup_location: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dropoff_location: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: false,
  }
);

export default Order;
