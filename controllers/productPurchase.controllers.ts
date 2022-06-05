import { response, request } from "express";
import { Product, ProductPurchase } from "../models/";


export const purchasesCreate = async (req = request, res = response) => {
  const { products, user } = req.body;

  const producto_purchase = new ProductPurchase();

  //   const { lista, total_lista } = await getProduct(products);
  // producto_purchases por id
  const lista: any = [];
  var total_lista: number = 0;

  const productos: any = await Product.find();

  products.forEach((element: number) => {
    const producto = productos.filter(
      (producto: any) => producto.id === element
    );

    total_lista += Number(producto[0].price);
    lista.push(producto);
  });

  producto_purchase.products = lista;
  producto_purchase.user = user;
  producto_purchase.purchaseDate = new Date();
  producto_purchase.total = total_lista;

  await producto_purchase.save();

  res.json({
    producto_purchase,
  });
};
