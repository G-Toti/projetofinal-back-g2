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
    return res.status(400).json({
      data: exists,
      msg: "Email já cadastrado. O email é uma chave única e não pode ser cadastrada duas vezes.",
    });

  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
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

  res.status(201).json({
    data: user,
    token: token,
    msg: "Usuário criado com sucesso!",
  });
};

export const login = async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      AND: {
        email: req.body.email,
        password: req.body.password,
      },
    },
  });

  if (user === null) {
    return res.status(403).json({
      msg: "Email ou senha incorretos.",
    });
  }

  const token = generateToken(user);
  res.json({
    data: user,
    token: token,
    msg: "Login realizado com sucesso!",
  });
};
