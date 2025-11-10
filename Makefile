.PHONY: test-ci

test-ci:
	DOCKER_HOST=unix://$(HOME)/.colima/act/docker.sock act --container-architecture linux/amd64 -W .github/workflows/ci.yml
