run:
	go run *.go

gen:
	protoc \
	--go_out=genproto \
	--go_opt=paths=source_relative \
	--go-grpc_out=genproto \
	--go-grpc_opt=paths=source_relative \
	inventory.proto