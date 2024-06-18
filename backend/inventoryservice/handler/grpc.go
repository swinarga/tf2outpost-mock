package handler

import (
	"context"

	inventory "github.com/swinarga/tf2outpost-mock/inventoryservice/genproto"
	"github.com/swinarga/tf2outpost-mock/inventoryservice/types"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
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
		err := status.Newf(
			codes.Internal,
			"error getting inventory id: %d",
			req.GetId(),
		)

		// res should be error message
		return nil, err.Err()
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
