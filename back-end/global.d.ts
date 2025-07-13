import "express";
import { UserPassportDocument } from "./types/types";

declare global {
    namespace Express {
        interface User extends UserPassportDocument {}
    }
}
