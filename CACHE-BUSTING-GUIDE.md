# Cache Busting Guide for CultivoAI

## The Problem

You were experiencing persistent caching across multiple ports because of:

1. **Turbopack aggressive caching** - `--turbopack` flag enabled persistent caching
2. **Production cache headers in development** - next.config.ts was caching everything for 1 year
3. **Browser service worker caching** - Browsers cache across ports on localhost
4. **Multiple server instances** - Old dev servers still running on different ports

## The Solution

### 1. Use the Nuclear Reset Script (When Things Get Bad)

Run this whenever you see stale content:

```bash
.\clear-all-cache.bat
```

This will:
- Kill all Node processes
- Delete `.next` folder
- Clear node_modules cache
- Clear pnpm cache
- Delete TypeScript build info
- Clean up temp files

### 2. Clear Browser Cache Completely

**Chrome/Edge:**
1. Press `Ctrl + Shift + Delete`
2. Select "All time"
3. Check: Cached images and files, Cookies and other site data
4. Click "Clear data"
5. Close ALL localhost tabs
6. **Hard refresh**: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)

**Alternative - Disable Cache While DevTools Open:**
1. Open DevTools (`F12`)
2. Go to Network tab
3. Check "Disable cache" checkbox
4. Keep DevTools open while developing

### 3. Kill All Node Processes (Windows)

If you suspect old servers are still running:

```bash
taskkill /F /IM node.exe
```

### 4. Use Port 3001 Consistently

Always use:
```bash
pnpm dev
```

This now defaults to port 3001 WITHOUT Turbopack.

If you want Turbopack (faster, but more caching):
```bash
pnpm dev:turbo
```

### 5. Verify No Old Servers Running

Check what's using ports:
```bash
netstat -ano | findstr :3000
netstat -ano | findstr :3001
```

## Configuration Changes Made

### next.config.ts
- **Development**: No caching headers (`Cache-Control: no-store`)
- **Production**: Full caching (1 year for static assets)

### package.json
- `pnpm dev` - Standard Next.js (less caching issues)
- `pnpm dev:turbo` - Turbopack mode (faster, but more caching)

## Daily Development Workflow

### Starting Development
1. Run `pnpm dev`
2. Open browser with DevTools cache disabled
3. Hard refresh first load (`Ctrl + Shift + R`)

### When You See Stale Content
1. Stop the dev server (`Ctrl + C`)
2. Run `.\clear-all-cache.bat`
3. Close all browser tabs
4. Clear browser cache
5. Run `pnpm dev` again
6. Hard refresh (`Ctrl + Shift + R`)

### After Making CSS/Layout Changes
- Hard refresh (`Ctrl + Shift + R`)
- If still stale, run clear-all-cache.bat

### After Making Component/Logic Changes
- Normal refresh should work
- If seeing stale code, check server restarted properly

## Prevention Tips

1. **Always use the same port** (3001)
2. **Keep DevTools cache disabled** during development
3. **Close old tabs** before starting new dev session
4. **Kill all Node processes** between sessions if switching projects
5. **Use incognito mode** for testing (bypasses all cache)

## Emergency Recovery

If absolutely nothing works:

```bash
# 1. Nuclear reset
.\clear-all-cache.bat

# 2. Reinstall dependencies
rm -rf node_modules
pnpm install

# 3. Clear browser completely
# - Chrome: chrome://settings/clearBrowserData
# - Edge: edge://settings/clearBrowserData

# 4. Restart computer (clears all in-memory caches)

# 5. Start fresh
pnpm dev
```

## Testing in Clean Environment

Use incognito/private browsing:
- Chrome: `Ctrl + Shift + N`
- Edge: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`

This bypasses all browser caches and gives you a clean slate for testing.

## Understanding the Caching Layers

```
┌─────────────────────────────────────┐
│     Browser Cache (1 year TTL)      │  ← Your issue was HERE
├─────────────────────────────────────┤
│   Next.js Cache Headers (Config)    │  ← Fixed: Dev = no-cache
├─────────────────────────────────────┤
│   Turbopack Cache (.turbo folder)   │  ← Disabled by default now
├─────────────────────────────────────┤
│   Next.js Build Cache (.next)       │  ← Cleared by script
├─────────────────────────────────────┤
│   Node Modules Cache                │  ← Cleared by script
└─────────────────────────────────────┘
```

## Monitoring

To see if cache is working correctly:

1. Open DevTools → Network tab
2. Look at Response Headers for any request
3. In **development**, you should see:
   ```
   Cache-Control: no-store, no-cache, must-revalidate
   ```
4. In **production**, you should see:
   ```
   Cache-Control: public, max-age=31536000, immutable
   ```

## Questions?

If you're still experiencing caching issues after following this guide:
1. Check that you're running `pnpm dev` (not an old server)
2. Verify DevTools shows correct Cache-Control headers
3. Try incognito mode to rule out browser extensions
4. Check no service workers are registered (DevTools → Application → Service Workers)
