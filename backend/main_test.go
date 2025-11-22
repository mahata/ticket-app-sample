package main

import (
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	router := gin.Default()
	router.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})
	return router
}

func TestAllowedOriginsReturnsDefaultWhenUnset(t *testing.T) {
	t.Setenv("ALLOW_ORIGINS", "")
	got := allowedOrigins()
	want := []string{"http://localhost:5173"}
	if !reflect.DeepEqual(got, want) {
		t.Fatalf("expected %v, got %v", want, got)
	}
}

func TestAllowedOriginsParsesCommaSeparatedValues(t *testing.T) {
	t.Setenv("ALLOW_ORIGINS", " http://example.com ,https://foo.com ")
	got := allowedOrigins()
	want := []string{"http://example.com", "https://foo.com"}
	if !reflect.DeepEqual(got, want) {
		t.Fatalf("expected %v, got %v", want, got)
	}
}

func TestAllowedOriginsFallsBackWhenValuesEmpty(t *testing.T) {
	t.Setenv("ALLOW_ORIGINS", " ,  , ")
	got := allowedOrigins()
	want := []string{"http://localhost:5173"}
	if !reflect.DeepEqual(got, want) {
		t.Fatalf("expected %v, got %v", want, got)
	}
}

func TestHealthEndpoint(t *testing.T) {
	router := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/health", nil)
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, w.Code)
	}

	expected := "OK"
	if w.Body.String() != expected {
		t.Errorf("Expected body %q, got %q", expected, w.Body.String())
	}
}
