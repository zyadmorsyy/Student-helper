const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportJWT = require("passport-jwt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWTStrategy = passportJWT.Strategy;

let user;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      user = await prisma.student.findUnique({
        where: { email: email.toString() },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
        },
      });

      if (!user) {
        user = await prisma.supervisor.findUnique({
          where: { email: email.toString() },
          select: {
            id: true,
            email: true,
            password: true,
            role: true,
          },
        });
      }
      if (!user) {
        user = await prisma.coordinator.findUnique({
          where: { email: email.toString() },
          select: {
            id: true,
            email: true,
            password: true,
            role: true,
          },
        });
      }

      if (user && email === user.email && password === user.password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "jwt_secret", // just for development
    },
    (jwt_payload, done) => {
      if (user.id === jwt_payload.user.id) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Token not matched",
        });
      }
    }
  )
);

module.exports = passport;
