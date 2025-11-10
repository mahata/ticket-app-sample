# What is this project about?

It's a sample ticketing application built with a React frontend and a Go backend, using PostgreSQL as the database.

## How to run the application

### Prerequisites

- Docker and Docker Compose installed on your machine.


```bash
docker-compose up -d
```

### Running the backend and frontend

```bash
cd backend
go run main.go
```

```bash
cd frontend
pnpm install
pnpm run dev
```

### How to run GitHub Actions locally

You can use the `act` tool to run GitHub Actions workflows locally. First, install `act` by following the instructions on its [GitHub page](https://github.com/nektos/act). Then, run the following command in the root directory of the project:

```bash
# Generic form
act -j <job-name>

# Example for CI workflow
act -W .github/workflows/ci.yml

# If you are using Colima for Docker on macOS with Apple Silicon, use the following command
DOCKER_HOST=unix://$HOME/.colima/act/docker.sock act --container-architecture linux/amd64 -W .github/workflows/ci.yml
```

Replace `<job-name>` with the name of the job you want to run from the GitHub Actions workflow file.
