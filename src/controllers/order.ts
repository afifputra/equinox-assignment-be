import { Request, Response } from "express";
import { isEmpty } from "lodash";

import Order from "../models/order";
import { createOrderSchema, updateOrderSchema } from "../config/validation";
import { handleErrorFromYup } from "../utils/commons";

const getOrders = async (_: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    return res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (isEmpty(order)) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    await createOrderSchema.validate(req.body, { abortEarly: false });
    await Order.create(req.body);

    return res.status(201).json({
      status: "success",
      message: "Order created successfully",
    });
  } catch (error: any) {
    const generatedError = handleErrorFromYup(error);
    res.status(500).json(generatedError);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    await updateOrderSchema.validate(req.body, { abortEarly: false });
    const order = await Order.findByPk(req.params.id);

    if (isEmpty(order)) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    await order.update(req.body);

    return res.status(200).json({
      status: "success",
      message: "Order updated successfully",
    });
  } catch (error: any) {
    const generatedError = handleErrorFromYup(error);
    res.status(500).json(generatedError);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (isEmpty(order)) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    await order.destroy();

    return res.status(200).json({
      status: "success",
      message: "Order deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
