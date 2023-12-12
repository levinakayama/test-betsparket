package helpers

import (
	"fmt"
	"net/http"
	"strings"
)

func NilOrString(v *string) *string {
	if v != nil {
		newStr := strings.Trim(*v, " ")
		newStr = strings.Trim(newStr, "\n")
		v = &newStr
		if *v == "" {
			v = nil
		}
	}
	return v
}

func NilOrInt64(v *int64) *int64 {
	if v != nil {
		return v
	}
	return nil
}

func ValidateStringRequired(w http.ResponseWriter, value *string, description string) bool {
	value = NilOrString(value)
	if value == nil {
		ResponseError(w, 1, fmt.Sprintf("Campo %s é obrigatório!", description))
		return false
	}
	return true
}

func ValidateInt64Required(w http.ResponseWriter, value *int64, description string) bool {
	if value == nil {
		ResponseError(w, 1, fmt.Sprintf("Campo %s é obrigatório!", description))
		return false
	}

	return true
}

func ValidateFloat64Required(w http.ResponseWriter, value *float64, description string) bool {
	if value == nil {
		ResponseError(w, 1, fmt.Sprintf("Campo %s é obrigatório!", description))
		return false
	}

	return true
}
