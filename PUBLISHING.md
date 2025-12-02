# Publishing Guide

This guide covers how to publish the Pine Script Language Support extension to both VS Code Marketplace and Open VSX.

## Prerequisites

### 1. Accounts Required

- **VS Code Marketplace**: Microsoft account (free)
  - Sign up at: https://marketplace.visualstudio.com/manage
  - Or use existing Microsoft account

- **Open VSX**: GitHub account (free)
  - Sign up at: https://open-vsx.org/
  - Uses GitHub OAuth for authentication

### 2. Install Publishing Tools

```bash
# Install VS Code Extension Manager (vsce)
npm install -g @vscode/vsce

# Verify installation
vsce --version
```

### 3. Get Personal Access Tokens

#### VS Code Marketplace Token

1. Go to: https://dev.azure.com/
2. Sign in with your Microsoft account
3. Click on your profile icon → **Security**
4. Click **New Token** or go to: https://dev.azure.com/_usersSettings/tokens
5. Create a new token with:
   - **Name**: `VS Code Marketplace Publishing`
   - **Organization**: `All accessible organizations`
   - **Expiration**: Set appropriate expiration (or leave blank for no expiration)
   - **Scopes**: `Full access` or `Marketplace (Manage)`
6. **Copy the token immediately** (you won't see it again)

#### Open VSX Token

1. Go to: https://open-vsx.org/
2. Sign in with GitHub
3. Click on your profile → **User Settings**
4. Go to **Access Tokens** section
5. Click **Create Token**
6. Give it a name (e.g., "Pine Script Extension")
7. **Copy the token** (save it securely)

## Publishing to VS Code Marketplace

### Step 1: Prepare package.json

Ensure your `package.json` has the required fields:

```json
{
  "name": "pinescript",
  "displayName": "Pine Script Language Support",
  "description": "Full language support for Pine Script v5 and v6...",
  "version": "1.0.0",
  "publisher": "your-publisher-name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/pinescript-extension"
  },
  "engines": {
    "vscode": "^1.74.0"
  },
  "categories": ["Programming Languages", "Snippets", "Linters"],
  "keywords": ["pinescript", "tradingview", "trading", "indicator", "strategy"],
  "license": "MIT"
}
```

**Important fields:**
- `publisher`: Your unique publisher ID (create at marketplace)
- `version`: Must follow semantic versioning (x.y.z)
- `repository`: Public repository URL (optional but recommended)

### Step 2: Create Publisher Account

1. Go to: https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft account
3. Click **Create Publisher**
4. Fill in:
   - **Publisher ID**: Choose unique ID (e.g., `yourname` or `yourcompany`)
   - **Publisher Name**: Display name
   - **Email**: Contact email
5. Accept terms and create

**Note**: Your `publisher` field in `package.json` must match this Publisher ID.

### Step 3: Build and Package

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package the extension
vsce package
```

This creates a `.vsix` file (e.g., `pinescript-1.0.0.vsix`).

### Step 4: Publish

#### Option A: Command Line (Recommended)

```bash
# Login (first time only)
vsce login <your-publisher-name>

# Or use personal access token
vsce login <your-publisher-name> -p <your-personal-access-token>

# Publish
vsce publish

# Or publish specific version
vsce publish 1.0.0
```

#### Option B: Manual Upload

1. Go to: https://marketplace.visualstudio.com/manage
2. Click **New Extension**
3. Select **VS Code**
4. Upload your `.vsix` file
5. Fill in extension details
6. Submit for review

### Step 5: Verify Publication

1. Check: https://marketplace.visualstudio.com/vscode
2. Search for your extension name
3. Verify all details are correct
4. Test installation: `code --install-extension <publisher>.<extension-name>`

## Publishing to Open VSX

### Step 1: Install Open VSX CLI

```bash
# Install Open VSX CLI
npm install -g @openvsx/cli

# Verify installation
ovsx --version
```

### Step 2: Prepare Extension

Same as VS Code Marketplace - ensure `package.json` is properly configured.

### Step 3: Build and Package

```bash
# Same as VS Code Marketplace
npm install
npm run compile
vsce package
```

### Step 4: Publish to Open VSX

```bash
# Login with your access token
ovsx login <your-open-vsx-token>

# Publish
ovsx publish pinescript-1.0.0.vsix

# Or publish with specific namespace
ovsx publish pinescript-1.0.0.vsix --namespace <your-namespace>
```

**Note**: Open VSX uses GitHub username as default namespace unless specified.

### Step 5: Verify Publication

1. Check: https://open-vsx.org/
2. Search for your extension
3. Verify installation works

## Updating Your Extension

### Version Bump

Before publishing updates, bump the version in `package.json`:

```json
{
  "version": "1.0.1"  // Increment patch, minor, or major
}
```

Follow [Semantic Versioning](https://semver.org/):
- **Patch** (1.0.1): Bug fixes
- **Minor** (1.1.0): New features, backward compatible
- **Major** (2.0.0): Breaking changes

### Update Process

```bash
# 1. Update version in package.json
# 2. Update CHANGELOG.md (if you have one)
# 3. Commit changes
git add package.json
git commit -m "Bump version to 1.0.1"
git tag v1.0.1

# 4. Build and package
npm run compile
vsce package

# 5. Publish to VS Code Marketplace
vsce publish

# 6. Publish to Open VSX
ovsx publish pinescript-1.0.1.vsix
```

## Best Practices

### 1. README.md

Ensure your README includes:
- Clear description
- Features list
- Installation instructions
- Usage examples
- Screenshots (optional but recommended)
- Requirements
- License information

### 2. CHANGELOG.md (Recommended)

Create a `CHANGELOG.md` file:

```markdown
# Change Log

## [1.0.1] - 2024-12-02
### Fixed
- Fixed version validation for v6

## [1.0.0] - 2024-12-02
### Added
- Initial release
- Pine Script v5 and v6 support
- Syntax highlighting
- Code completion
- Hover documentation
- Diagnostics
```

### 3. License

Include a `LICENSE` file (MIT recommended for open source).

### 4. Repository

- Keep repository public (recommended)
- Include proper `.gitignore`
- Add clear README
- Include test files
- Tag releases: `git tag v1.0.0`

### 5. Extension Icon

Add an icon to `package.json`:

```json
{
  "icon": "icon.png"
}
```

Create a 128x128 PNG icon in the root directory.

### 6. Marketplace Badges

Add badges to your README:

```markdown
[![VS Code Marketplace](https://img.shields.io/vscode-marketplace/v/publisher.extension-name.svg)](https://marketplace.visualstudio.com/items?itemName=publisher.extension-name)
[![Open VSX](https://img.shields.io/open-vsx/v/publisher/extension-name)](https://open-vsx.org/extension/publisher/extension-name)
```

## Troubleshooting

### Common Issues

#### "Publisher ID does not match"

**Problem**: `publisher` in `package.json` doesn't match your Marketplace publisher ID.

**Solution**: Update `package.json` to match your publisher ID, or create a new publisher with matching ID.

#### "Extension already exists"

**Problem**: Trying to publish with same version number.

**Solution**: Bump version in `package.json` before publishing.

#### "Invalid token"

**Problem**: Personal access token expired or incorrect.

**Solution**: Generate new token and update credentials.

#### "Package too large"

**Problem**: Extension package exceeds size limits.

**Solution**: 
- Add files to `.vscodeignore`
- Remove unnecessary files from `node_modules`
- Use bundling (webpack, etc.)

### .vscodeignore File

Create `.vscodeignore` to exclude unnecessary files:

```
.vscode/**
.vscode-test/**
src/**
.gitignore
.yarnrc
vscode/**
*.vsix
*.map
**/*.map
**/*.ts
!out/**/*.js
tsconfig.json
.eslintrc.json
.prettierrc.json
.prettierignore
```

## Publishing Checklist

Before publishing, ensure:

- [ ] `package.json` has correct `publisher` ID
- [ ] `package.json` has correct `version`
- [ ] Extension compiles without errors
- [ ] All tests pass
- [ ] README.md is complete and accurate
- [ ] LICENSE file exists
- [ ] CHANGELOG.md is updated (if applicable)
- [ ] `.vscodeignore` excludes unnecessary files
- [ ] Extension works when installed locally
- [ ] No sensitive information in code
- [ ] Repository is public (if linking)

## Quick Reference Commands

```bash
# Build
npm install
npm run compile

# Package
vsce package

# Publish to VS Code Marketplace
vsce publish

# Publish to Open VSX
ovsx publish pinescript-1.0.0.vsix

# Check extension info
vsce ls

# Show extension details
vsce show <publisher>.<extension-name>
```

## Resources

- [VS Code Extension Publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Open VSX Publishing](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions)
- [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Semantic Versioning](https://semver.org/)

## Support

If you encounter issues:

1. Check VS Code Marketplace documentation
2. Check Open VSX documentation
3. Review extension logs
4. Check GitHub issues for similar problems

