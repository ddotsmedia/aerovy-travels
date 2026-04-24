# Aerovy Travels - project launcher
# Opens the project in VS Code, copies the master prompt to the clipboard,
# and (optionally) starts a Claude Code session in the integrated terminal.

$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ProjectRoot

Write-Host ''
Write-Host '================================================================' -ForegroundColor DarkYellow
Write-Host '  Aerovy Travels  -  project launcher' -ForegroundColor Yellow
Write-Host '================================================================' -ForegroundColor DarkYellow
Write-Host ''
Write-Host ("Project folder: {0}" -f $ProjectRoot) -ForegroundColor Gray
Write-Host ''

# ---------------------------------------------------------------------------
# 1. Pre-flight: confirm the files we expect are here
# ---------------------------------------------------------------------------
$required = @(
  'CLAUDE_CODE_PROMPT.md',
  'assets\logo.png',
  'assets\logo-small.png',
  'assets\logo-source.pdf'
)
$missing = @()
foreach ($f in $required) {
  if (-not (Test-Path (Join-Path $ProjectRoot $f))) { $missing += $f }
}
if ($missing.Count -gt 0) {
  Write-Host 'Missing files:' -ForegroundColor Red
  $missing | ForEach-Object { Write-Host ('  - {0}' -f $_) -ForegroundColor Red }
  Write-Host 'Make sure you extracted the whole aerovy-travels folder as one unit.' -ForegroundColor Red
  exit 1
}
Write-Host '[1/5] Project files present.' -ForegroundColor Green

# ---------------------------------------------------------------------------
# 2. Check for VS Code
# ---------------------------------------------------------------------------
$codeCmd = Get-Command code -ErrorAction SilentlyContinue
if (-not $codeCmd) {
  Write-Host '[2/5] VS Code CLI (`code`) not found on PATH.' -ForegroundColor Yellow
  Write-Host '      Install VS Code from https://code.visualstudio.com/download' -ForegroundColor Yellow
  Write-Host '      During install, tick "Add to PATH", or from inside VS Code run' -ForegroundColor Yellow
  Write-Host '      Command Palette -> Shell Command: Install ''code'' command in PATH.' -ForegroundColor Yellow
  $openAnyway = Read-Host 'Open the folder in Explorer instead? [Y/n]'
  if ($openAnyway -ne 'n' -and $openAnyway -ne 'N') { Start-Process explorer.exe $ProjectRoot }
  exit 1
}
Write-Host '[2/5] VS Code CLI detected.' -ForegroundColor Green

# ---------------------------------------------------------------------------
# 3. Check for Node.js + Claude Code CLI
# ---------------------------------------------------------------------------
$nodeCmd   = Get-Command node   -ErrorAction SilentlyContinue
$claudeCmd = Get-Command claude -ErrorAction SilentlyContinue

if (-not $nodeCmd) {
  Write-Host '[3/5] Node.js not found. Claude Code needs Node 18+.' -ForegroundColor Yellow
  Write-Host '      Install from https://nodejs.org (LTS) then re-run this launcher.' -ForegroundColor Yellow
} elseif (-not $claudeCmd) {
  Write-Host '[3/5] Claude Code CLI not found.' -ForegroundColor Yellow
  $install = Read-Host 'Install it now with `npm i -g @anthropic-ai/claude-code`? [Y/n]'
  if ($install -ne 'n' -and $install -ne 'N') {
    Write-Host '      Installing...' -ForegroundColor Gray
    npm install -g '@anthropic-ai/claude-code'
    if ($LASTEXITCODE -eq 0) {
      Write-Host '      Installed.' -ForegroundColor Green
    } else {
      Write-Host '      Install failed. You can install manually later.' -ForegroundColor Red
    }
  }
} else {
  Write-Host '[3/5] Claude Code CLI detected.' -ForegroundColor Green
}

# ---------------------------------------------------------------------------
# 4. Copy the master prompt to the clipboard
# ---------------------------------------------------------------------------
$promptPath = Join-Path $ProjectRoot 'CLAUDE_CODE_PROMPT.md'
$promptText = Get-Content $promptPath -Raw

# Extract ONLY Section 1 (the part you paste first) for the clipboard
$section1 = $null
$match = [regex]::Match(
  $promptText,
  '##\s*SECTION\s*1[^\n]*\n(?<body>[\s\S]*?)(?=\n##\s*SECTION\s*2)',
  'IgnoreCase'
)
if ($match.Success) {
  $section1 = $match.Groups['body'].Value.Trim()
  Set-Clipboard -Value $section1
  Write-Host '[4/5] Section 1 of the prompt copied to clipboard.' -ForegroundColor Green
} else {
  Set-Clipboard -Value $promptText
  Write-Host '[4/5] Full prompt copied to clipboard (Section 1 marker not found).' -ForegroundColor Yellow
}

# ---------------------------------------------------------------------------
# 5. Open VS Code and start Claude Code in the integrated terminal
# ---------------------------------------------------------------------------
Write-Host '[5/5] Opening VS Code...' -ForegroundColor Green

# Open the folder + the prompt file so it's visible in the editor
& code $ProjectRoot (Join-Path $ProjectRoot 'CLAUDE_CODE_PROMPT.md')

Start-Sleep -Seconds 2

if ($claudeCmd) {
  Write-Host ''
  Write-Host 'Next step:' -ForegroundColor Cyan
  Write-Host '  1. In VS Code: Terminal -> New Terminal  (Ctrl+`)' -ForegroundColor Cyan
  Write-Host '  2. Run:  claude' -ForegroundColor Cyan
  Write-Host '  3. Paste the prompt (already on your clipboard) and press Enter.' -ForegroundColor Cyan
  Write-Host ''
  Write-Host 'Credit-saving tip: stop after the scaffold step, then feed Section 2' -ForegroundColor DarkGray
  Write-Host 'prompts ONE AT A TIME, using /clear between unrelated phases.' -ForegroundColor DarkGray
} else {
  Write-Host ''
  Write-Host 'Once Claude Code is installed, open a terminal in VS Code and run:' -ForegroundColor Cyan
  Write-Host '  claude' -ForegroundColor Cyan
  Write-Host 'Then paste the prompt (already on your clipboard).' -ForegroundColor Cyan
}

Write-Host ''
Write-Host 'Done.' -ForegroundColor Yellow
Start-Sleep -Seconds 3
