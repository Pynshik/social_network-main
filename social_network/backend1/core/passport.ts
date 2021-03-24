import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { UserModel, UserModelInterface } from "../models/UserModel";

passport.use(
  new LocalStrategy(
    async (username, password, done): Promise<void> => {
      try {
        const user = await UserModel.findOne({
          $or: [{ email: username }, { username }],
        }).exec();

        if (!user) {
          return done(null, false);
        }
        
        //@ts-ignore
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.log(error)

        done(error, false);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: '26hgKWUB6kdbSjS',
      jwtFromRequest: ExtractJwt.fromHeader('token'),
    },
    async (payload: { data: UserModelInterface }, done): Promise<void> => {
      try {
        const user = await UserModel.findById(payload.data._id).exec();

        if (user) {
          return done(null, user);
        }

        done(null, false);
      } catch (error) {
          console.log(error)
        done(error, false);
      }
    }
  )
);

passport.serializeUser((user: any, done): void => {
  done(null, user?._id);
});

passport.deserializeUser(function (id, done) {
  UserModel.findById(id, (err: any, user: UserModelInterface) => {
    done(err, user);
  });
});

export { passport };
