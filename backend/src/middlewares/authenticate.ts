import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.ACCESS_JWT_SECRET;

if (!secret) {
  console.log("secret du token d'accès manquant");
  process.exit(1);
}

const authenticate: RequestHandler = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("✅ Authentification de l'utilisateur avec le token :", token);
  if (!token)
    return next(new Error("Non authentifié", { cause: { status: 401 } }));

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    if (!decoded.jti)
      return next(new Error("Token invalide", { cause: { status: 401 } }));

    const user = {
      id: decoded.jti,
      roles: decoded.roles,
    };

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new Error("Token Access Expiré", { cause: { status: 401 } }));
    }
    return next(new Error("Token invalide", { cause: { status: 401 } }));
  }
};

export default authenticate;
