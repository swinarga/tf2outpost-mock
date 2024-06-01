package main

import (
	"log"
	"net"

	// handler "github.com/swinarga/kitchen-microservice/services/orders/handler/orders"
	// "github.com/swinarga/kitchen-microservice/services/orders/service"

	handler "github.com/swinarga/tf2outpost-mock/inventoryservice/handler"
	"github.com/swinarga/tf2outpost-mock/inventoryservice/service"
	"google.golang.org/grpc"
)

type gRPCServer struct {
	addr string
}

func NewGRPCServer(addr string) *gRPCServer {
	return &gRPCServer{addr: addr}
}

func (s *gRPCServer) Run() error {
	lis, err := net.Listen("tcp", s.addr)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	gRPCServer := grpc.NewServer()

	// register gRPC services
	inventoryService := service.NewInventoryService()
	handler.NewGrpcInventoryService(gRPCServer, inventoryService)

	log.Println("gRPC server is running on", s.addr)

	return gRPCServer.Serve(lis)
}
