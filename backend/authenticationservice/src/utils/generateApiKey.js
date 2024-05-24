import crypto from "crypto";
import bcrypt from "bcrypt";

const saltRounds = 10;
const token = crypto.randomUUID();
const hashedToken = await bcrypt.hash(token, saltRounds);

console.log(hashedToken);
