package main

import (
	"log"
	"net/http"
	"siios/controllers"
	"siios/helpers"

	"github.com/gorilla/mux"
)

func main() {
	apiPort := helpers.GetEnv("API_PORT")
	router := mux.NewRouter()

	router.HandleFunc("/{a}", func(w http.ResponseWriter, r *http.Request) {}).Methods("OPTIONS")
	router.HandleFunc("/{a}/{b}", func(w http.ResponseWriter, r *http.Request) {}).Methods("OPTIONS")
	router.HandleFunc("/{a}/{b}/{c}", func(w http.ResponseWriter, r *http.Request) {}).Methods("OPTIONS")
	router.HandleFunc("/{a}/{b}/{c}/{d}", func(w http.ResponseWriter, r *http.Request) {}).Methods("OPTIONS")

	//token
	router.HandleFunc("/calculate", controllers.CalculatePost).Methods("POST")

	mux.CORSMethodMiddleware(router)
	router.Use(Middleware)

	log.Fatal(http.ListenAndServe("0.0.0.0:"+apiPort, router))
}

func Middleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ApplyCors(w)
		if r.Method != "OPTIONS" {
			if r.Header.Get("appKey") != "B55880DC86DFA982C4172A22D4EBF0B1ECAAFD3552426F35EEFE8C520CF1CB8F" {
				helpers.ResponseError(w, 1, "Acesso api inválido.")
				return
			}

			h.ServeHTTP(w, r)
			return
		}
	})
}

func ApplyCors(w http.ResponseWriter) {
	cors := helpers.GetEnv("API_CORS")
	w.Header().Set("Access-Control-Allow-Origin", cors)
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, appKey, token")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Content-Type", "application/json")
}
