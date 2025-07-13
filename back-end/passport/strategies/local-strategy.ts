import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { UserPassportDocument } from "../../types/types";

passport.serializeUser((user, done) => {
    console.log("SERIALIZING --------------------");
    const u = user as UserPassportDocument;
    try {
        done(null, u.id);
    } catch (error) {
        done(error, null);
    }
});

passport.deserializeUser(async (userId, done) => {
    console.log("DEEEEEEESERIALIZING --------------------");
    try {
        const user: UserPassportDocument | null = await User.findById(userId);

        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (username, password, done) => {
            try {
                const user: UserPassportDocument | null = await User.findOne({
                    email: username,
                });

                if (!user) {
                    return done(null, false);
                }

                const matchedPasswords = await bcrypt.compare(
                    password,
                    user.password
                );

                if (matchedPasswords) {
                    done(null, user);
                } else {
                    throw new Error("Invalid credentials");
                }
            } catch (error) {
                done(error, undefined);
            }
        }
    )
);

export { passport };
