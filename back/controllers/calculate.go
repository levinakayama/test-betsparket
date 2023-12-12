package controllers

import (
	"net/http"
	"siios/helpers"
)

func CalculatePost(w http.ResponseWriter, r *http.Request) {

	res := map[string]interface{}{}
	helpers.ResponseOk(w, res)
}
