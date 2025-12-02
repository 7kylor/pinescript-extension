# Quick Publishing Guide

## Prerequisites Checklist

- [ ] Microsoft account (for VS Code Marketplace)
- [ ] GitHub account (for Open VSX)
- [ ] Publisher ID created at https://marketplace.visualstudio.com/manage
- [ ] Personal Access Token for VS Code Marketplace
- [ ] Access Token for Open VSX

## Step-by-Step Publishing

### 1. Install Tools

```bash
npm install -g @vscode/vsce @openvsx/cli
```

### 2. Update package.json

**IMPORTANT**: Update the `publisher` field to match your Publisher ID:

```json
{
  "publisher": "your-publisher-id"
}
```

### 3. Build and Package

```bash
npm install
npm run compile
vsce package
```

### 4. Publish to VS Code Marketplace

```bash
# Login (first time)
vsce login your-publisher-id

# Publish
vsce publish
```

### 5. Publish to Open VSX

```bash
# Login (first time)
ovsx login <your-open-vsx-token>

# Publish
ovsx publish pinescript-1.0.0.vsix
```

## Getting Tokens

### VS Code Marketplace Token

1. Go to: https://dev.azure.com/_usersSettings/tokens
2. Click "New Token"
3. Name: "VS Code Publishing"
4. Scopes: "Marketplace (Manage)"
5. Copy token immediately

### Open VSX Token

1. Go to: https://open-vsx.org/
2. Sign in with GitHub
3. Profile → User Settings → Access Tokens
4. Create token
5. Copy token

## Common Issues

**"Publisher ID does not match"**
- Update `publisher` in `package.json` to match your Marketplace publisher ID

**"Extension already exists"**
- Bump version in `package.json` before publishing

**"Invalid token"**
- Generate new token and update credentials

## Full Documentation

See [PUBLISHING.md](./PUBLISHING.md) for complete instructions.

