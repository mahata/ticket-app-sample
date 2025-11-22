package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func allowedOrigins() []string {
	value := os.Getenv("ALLOW_ORIGINS")
	defaultOrigins := []string{"http://localhost:5173"}
	if value == "" {
		return defaultOrigins
	}

	segments := strings.Split(value, ",")
	origins := make([]string, 0, len(segments))
	for _, segment := range segments {
		origin := strings.TrimSpace(segment)
		if origin != "" {
			origins = append(origins, origin)
		}
	}
	if len(origins) == 0 {
		return defaultOrigins
	}
	return origins
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error loading .env file")
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins(),
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	router.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})

	router.POST("/api/auth/google", handleGoogleLogin)

	protected := router.Group("/api")
	protected.Use(AuthMiddleware())
	{
		protected.GET("/me", handleGetCurrentUser)
		protected.GET("/my-path-data", handleMyPathData)
	}

	router.Run(":8080")
}

func handleGoogleLogin(c *gin.Context) {
	var req GoogleTokenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := verifyGoogleToken(c.Request.Context(), req.Credential)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Google token"})
		return
	}

	token, err := generateJWT(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, LoginResponse{
		Token: token,
		User:  *user,
	})
}

func handleGetCurrentUser(c *gin.Context) {
	claims, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	userClaims := claims.(*Claims)
	c.JSON(http.StatusOK, User{
		Email:   userClaims.Email,
		Name:    userClaims.Name,
		Picture: userClaims.Picture,
	})
}

func handleMyPathData(c *gin.Context) {
	claims, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}
	userClaims := claims.(*Claims)

	c.JSON(http.StatusOK, gin.H{
		"message": "This is protected data for /my-path",
		"user":    userClaims.Email,
		"data":    "Some sensitive information",
	})
}
