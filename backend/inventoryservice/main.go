package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// httpServer := NewHttpServer(":3002")
	// httpServer.Run()

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
		os.Exit(1)
	}

	gRPCServer := NewGRPCServer(":3003")
	gRPCServer.Run()
}
