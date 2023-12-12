package controllers

import (
	"encoding/json"
	"net/http"
	"siios/helpers"
)

func ValidatePost(w http.ResponseWriter, r *http.Request) {
	var row ValidateRequest
	json.NewDecoder(r.Body).Decode(&row)

	if !helpers.ValidateInt64Required(w, row.ValueX, "Final X") {
		return
	}

	if !helpers.ValidateInt64Required(w, row.ValueY, "Final Y") {
		return
	}

	if !helpers.ValidateInt64Required(w, row.ValueZ, "Value Z") {
		return
	}

	if *row.ValueZ <= 0 {
		helpers.ResponseError(w, 1, "Value Z more then zero")
		return
	}

	validate := false
	if *row.ValueX == *row.ValueZ {
		validate = true
	} else if *row.ValueY == *row.ValueZ {
		validate = true
	}

	res := map[string]interface{}{
		"validate": validate,
	}
	helpers.ResponseOk(w, res)
}

type ValidateRequest struct {
	ValueX *int64 `json:"valueX"`
	ValueY *int64 `json:"valueY"`
	ValueZ *int64 `json:"valueZ"`
}
