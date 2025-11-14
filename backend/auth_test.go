package main

import (
	"testing"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func TestGenerateAndValidateJWT(t *testing.T) {
	user := &User{
		Email:   "test@example.com",
		Name:    "Test User",
		Picture: "https://example.com/photo.jpg",
	}

	token, err := generateJWT(user)
	if err != nil {
		t.Fatalf("Failed to generate JWT: %v", err)
	}

	claims, err := validateJWT(token)
	if err != nil {
		t.Fatalf("Failed to validate JWT: %v", err)
	}

	if claims.Email != user.Email {
		t.Errorf("Expected email %s, got %s", user.Email, claims.Email)
	}

	if claims.Name != user.Name {
		t.Errorf("Expected name %s, got %s", user.Name, claims.Name)
	}
}

func TestValidateExpiredJWT(t *testing.T) {
	claims := Claims{
		Email:   "test@example.com",
		Name:    "Test User",
		Picture: "https://example.com/photo.jpg",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(-1 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now().Add(-2 * time.Hour)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		t.Fatalf("Failed to create token: %v", err)
	}

	_, err = validateJWT(tokenString)
	if err == nil {
		t.Error("Expected error for expired token, got nil")
	}
}
