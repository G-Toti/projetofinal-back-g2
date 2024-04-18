import { PrismaClient } from "@prisma/client";
import generateToken from "../utils/jwt.js";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const exists = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });

  if (exists)
    return res.json({
      data: exists,
      msg: "Erro: Email já cadastrado",
    });

  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: req.body.password,
      profile: {
        create: {
          name: req.body.name,
          cart: {
            create: {
              product: { create: [] },
            },
          },
        },
      },
    },
  });

  const token = generateToken(user);

  res.json({
    data: user,
    token: token,
    msg: "Usuário criado com sucesso!",
  });
};
