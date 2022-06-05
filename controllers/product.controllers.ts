import { response, request } from "express";
import * as bcryptjs from "bcryptjs";
import { Auth, Product } from "../models/";
import { MoreThan } from "typeorm";

export const productosGet = async (req = request, res = response) => {
  const prodcutos = await Product.find({
    where: {
      quantity: MoreThan(0),
    },
  });

  res.json({
    prodcutos,
  });
};
export const productosCreate = async (req = request, res = response) => {
  const { name, category, price, quantity } = req.body;

  const producto = new Product();

  producto.name = name;
  producto.category = category;
  producto.price = price;
  producto.quantity = quantity;
  producto.state = true;
  await producto.save();

  res.json({
    producto,
  });
};

export const productosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  await Product.update({ id: parseInt(id) }, { state: false });

  res.json({
    msg: "Producto eliminado con exito",
  });
};

export const productosPut = async (req = request, res = response) => {
  const { id } = req.params;

  await Product.update({ id: parseInt(id) }, req.body);

  res.json({
    msg: "Producto modificado con exito",
  });
};
