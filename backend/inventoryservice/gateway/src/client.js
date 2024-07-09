import path from "path";
import { fileURLToPath } from "url";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH =
	path.dirname(fileURLToPath(import.meta.url)) + "../../../inventory.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true,
});
const inventoryProto =
	grpc.loadPackageDefinition(packageDefinition).InventoryService;

export default new inventoryProto(
	process.env.INVENTORY_SERVICE_ADDRESS || "0.0.0.0:3003",
	grpc.credentials.createInsecure()
);
