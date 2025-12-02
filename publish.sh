#!/bin/bash
# Publishing script for Pine Script Extension

set -e

echo "=== Pine Script Extension Publishing Script ==="
echo ""

# Check if vsce is installed
if ! command -v vsce &> /dev/null; then
    echo "Error: vsce is not installed"
    echo "Install it with: npm install -g @vscode/vsce"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found"
    exit 1
fi

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")
PUBLISHER=$(node -p "require('./package.json').publisher")
NAME=$(node -p "require('./package.json').name")

echo "Extension: $PUBLISHER.$NAME"
echo "Version: $VERSION"
echo ""

# Build
echo "Building extension..."
npm install
npm run compile

# Package
echo "Packaging extension..."
vsce package

VSIX_FILE="${NAME}-${VERSION}.vsix"

if [ ! -f "$VSIX_FILE" ]; then
    echo "Error: VSIX file not created"
    exit 1
fi

echo ""
echo "✓ Extension packaged: $VSIX_FILE"
echo ""
echo "Next steps:"
echo "1. Review the package: vsce ls"
echo "2. Publish to VS Code Marketplace: vsce publish"
echo "3. Publish to Open VSX: ovsx publish $VSIX_FILE"
echo ""
echo "For detailed instructions, see PUBLISHING.md"
