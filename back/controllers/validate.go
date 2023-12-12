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

	if *row.ValueX <= 0 {
		helpers.ResponseError(w, 1, "Final X more then zero")
		return
	}

	if !helpers.ValidateInt64Required(w, row.ValueY, "Final Y") {
		return
	}

	if *row.ValueY <= 0 {
		helpers.ResponseError(w, 1, "Final Y more then zero")
		return
	}

	if !helpers.ValidateInt64Required(w, row.ValueZ, "Value Z") {
		return
	}

	if *row.ValueZ <= 0 {
		helpers.ResponseError(w, 1, "Value Z more then zero")
		return
	}

	res := map[string]interface{}{
		"msg": "Registro excluído com sucesso!",
	}
	helpers.ResponseOk(w, res)
}

type ValidateRequest struct {
	ValueX *int64 `json:"valueX"`
	ValueY *int64 `json:"valueY"`
	ValueZ *int64 `json:"valueZ"`
}
