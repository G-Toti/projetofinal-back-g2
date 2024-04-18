import jwt from "jsonwebtoken";

export default function adminLevel(req, res, next) {
  const authenticator = req.headers["authorization"];

  if (!authenticator) {
    return res.status(401).json({
      data: null,
      token: authenticator,
      msg: "Nenhum autenticador encontrado. Verifique as informações do header e tente novamente.",
    });
  }

  const token = authenticator.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          data: user,
          token: token,
          msg: `Token para o usuário enviado é inválido`,
        });
      }

      if (!user.role) {
        return res.status(403).json({
          data: user,
          token: token,
          msg: `O usuário deve ser um administrador para poder acessar essa rota.`,
        });
      }

      next();
    });
  } else {
    return res.status(401).json({
      data: null,
      token: token,
      msg: "Formato para o token inválido. Formato esperado: 'Bearer <token>'",
    });
  }
}
