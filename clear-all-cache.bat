@echo off
echo ===============================================
echo  CultivoAI - NUCLEAR CACHE RESET
echo ===============================================
echo.
echo This will clear:
echo - .next folder
echo - node_modules/.cache
echo - Turbopack cache
echo - TypeScript build info
echo - pnpm store cache
echo.
pause

echo.
echo [1/7] Stopping any running dev servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

echo [2/7] Deleting .next folder...
if exist .next rmdir /s /q .next
echo Done.

echo [3/7] Deleting node_modules cache...
if exist node_modules\.cache rmdir /s /q node_modules\.cache
echo Done.

echo [4/7] Deleting TypeScript build info...
if exist tsconfig.tsbuildinfo del /f /q tsconfig.tsbuildinfo
echo Done.

echo [5/7] Clearing pnpm cache...
pnpm store prune
echo Done.

echo [6/7] Deleting port lock files...
if exist .next\cache\fetch-cache rmdir /s /q .next\cache\fetch-cache
echo Done.

echo [7/7] Cleaning temp files...
if exist nul del /f /q nul
if exist icacls del /f /q icacls
if exist takeown del /f /q takeown
echo Done.

echo.
echo ===============================================
echo  CACHE CLEARED SUCCESSFULLY!
echo ===============================================
echo.
echo Next steps:
echo 1. Close ALL browser tabs for localhost
echo 2. Clear browser cache (Ctrl+Shift+Delete)
echo 3. Run: pnpm dev
echo.
pause
