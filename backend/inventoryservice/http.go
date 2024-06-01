package main

import (
	"fmt"
	"log"
	"net/http"
)

type httpServer struct {
	addr string
}

func NewHttpServer(addr string) *httpServer {
	return &httpServer{addr: addr}
}

func (s *httpServer) Run() error {
	router := http.NewServeMux()

	router.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "GET / called")
		// log.Println("GET / called")
	})
	router.HandleFunc("GET /{id}", func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		fmt.Fprintf(w, "GET /{id}: %s called", id)
		// log.Println("GET / called")
	})

	router.HandleFunc("POST /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "POST / called")

		// log.Println("POST / called")
	})

	log.Println("HTTP server is running on", s.addr)
	return http.ListenAndServe(s.addr, router)
}
