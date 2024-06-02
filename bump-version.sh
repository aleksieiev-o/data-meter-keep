#!/bin/bash

# Function to increment version numbers
increment_version() {
    local version=$1
    local part=$2

    IFS='.' read -r -a parts <<< "$version"

    case $part in
        major)
            ((parts[0]++))
            parts[1]=0
            parts[2]=0
            ;;
        minor)
            ((parts[1]++))
            parts[2]=0
            ;;
        patch)
            ((parts[2]++))
            ;;
        *)
            echo "Invalid part: $part. Use 'major', 'minor', or 'patch'."
            exit 1
            ;;
    esac

    echo "${parts[0]}.${parts[1]}.${parts[2]}"
}

# Function to check if the current directory is a git repository
is_git_repo() {
    git rev-parse --is-inside-work-tree &>/dev/null
}

# Check if package.json exists
if [[ ! -f package.json ]]; then
    echo "package.json not found!"
    exit 1
fi

# Get the current version from package.json
current_version=$(grep -oP '(?<="version": ")[^"]*' package.json)

if [[ -z $current_version ]]; then
    echo "Version not found in package.json"
    exit 1
fi

# Check for argument
if [[ $# -ne 1 ]]; then
    echo "Usage: $0 [major|minor|patch]"
    exit 1
fi

# Increment the version
new_version=$(increment_version "$current_version" "$1")

# Check if the directory is a git repository
if is_git_repo; then
    echo "Git repository detected. Running npm version $new_version"
    npm version "$new_version"
else
    echo "No git repository detected. Updating package.json with version $new_version"

    # Update the package.json with the new version
    sed -i'' -e "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" package.json

    echo "Version updated to $new_version"
fi
