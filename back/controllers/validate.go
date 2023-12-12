package controllers

import (
	"net/http"
	"siios/helpers"
)

func ValidatePost(w http.ResponseWriter, r *http.Request) {

	res := map[string]interface{}{
		"msg": "Registro excluído com sucesso!",
	}
	helpers.ResponseOk(w, res)
}
