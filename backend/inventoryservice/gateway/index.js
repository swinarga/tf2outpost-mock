import express from "express";
import dotenv from "dotenv";
import * as OpenApiValidator from "express-openapi-validator";
import { getDocByKey } from "./src/firebase/firebase.js";
import inventoryRoutes from "./src/routes/inventories.js";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUI from "swagger-ui-express";
import jsYaml from "js-yaml";
import fs from "fs";
import bodyParser from "body-parser";

dotenv.config();

// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(bodyParser.json());

// serve the OpenAPI schema
const public_spec_path = path.join(__dirname, "/api/api.yaml");
app.use("/spec", express.static(public_spec_path));

const public_spec = jsYaml.load(fs.readFileSync(public_spec_path, "utf8"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(public_spec));

// TODO: uncomment this when finished writing the API
// app.use(
// 	OpenApiValidator.middleware({
// 		apiSpec: public_spec,
// 		validateResponses: true,
// 	})
// );

app.use("/inventories", inventoryRoutes);

app.listen(3002);
console.log("Express server listening on port: " + 3002);
