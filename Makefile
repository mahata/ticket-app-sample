.PHONY: test-ci

test-ci:
	DOCKER_HOST=unix://$(HOME)/.colima/act/docker.sock act --container-architecture linux/amd64 -W .github/workflows/ci.yml

test_backend:
	cd backend && go test ./... -v

test_frontend:
	cd frontend && pnpm test
