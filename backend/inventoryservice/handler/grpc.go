package handler

import (
	"context"

	inventory "github.com/swinarga/tf2outpost-mock/inventoryservice/genproto"
	"github.com/swinarga/tf2outpost-mock/inventoryservice/types"
	"google.golang.org/grpc"
)

// implements the InventoryServiceServer interface
type InventoryGrpcHandler struct {
	inventoryService types.InventoryService
	inventory.UnimplementedInventoryServiceServer
}

// function signature copied from genproto/inventoryy_grpc.pb.go
func (h *InventoryGrpcHandler) GetInventory(ctx context.Context, req *inventory.GetInventoryRequest) (*inventory.GetInventoryResponse, error) {
	inv, err := h.inventoryService.GetInventory(ctx, req.GetId())
	if err != nil {
		// res should be error message
	}

	// fmt.Printf("Inventory items: %v\n", inv.Items)

	res := &inventory.GetInventoryResponse{
		SteamId:          inv.SteamId,
		NumBackpackSlots: inv.NumBackpackSlots,
		Items:            inv.Items,
	}

	return res, nil
}

func NewGrpcInventoryService(grpc *grpc.Server, inventoryService types.InventoryService) {
	gRPCHandler := &InventoryGrpcHandler{
		inventoryService: inventoryService,
	}

	inventory.RegisterInventoryServiceServer(grpc, gRPCHandler)
}
