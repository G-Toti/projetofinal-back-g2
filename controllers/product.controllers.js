import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      price: parseFloat(req.body.price),
      description: req.body.description,
      image: req.file.path,
      stock: parseInt(req.body.stock),
      sold: parseInt(req.body.sold),
      cart: {
        create: [],
      },
    },
  });

  res.status(201).json({
    data: product,
    msg: "Produto criado com sucesso!",
  });
};
