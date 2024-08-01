#!/bin/zsh -f
source ~/.zshrc

setup_local() {
    bun install
    cd client
    bun install
    cd ../server
    bun install
    cd ..
    docker compose stop
    docker compose rm -f
    docker compose up postgres redis -d
    cd server
    bun generate
    bun migrate
}

setup_and_run_docker() {
    bun install
    cd client
    bun install
    cd ../server
    bun install
    cd ..
    docker compose stop
    docker compose rm -f
    docker compose up -d
    cd server
    bun generate
    bun migrate
}

run_docker() {
    docker compose stop
    docker compose rm -f
    docker compose up -d
}

run_local() {
    docker compose stop
    docker compose rm -f
    docker compose up postgres redis -d
}

# Get the function name from the command-line argument
function_name=$1

# Check if a function with the provided name exists
if [[ "$(type $function_name 2>/dev/null)" == *function* ]]; then
    # Invoke the function
    $function_name
else
    echo "Function '$function_name' not found."
fi