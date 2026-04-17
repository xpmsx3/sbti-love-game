Param(
  [string]$OutDir = "$(Join-Path $PSScriptRoot '..\\assets\\avatars')"
)

$ErrorActionPreference = "Stop"

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$codes = @(
  "IMSB","BOSS","MUM","FAKE","DEAD","ZZZZ","GOGO","FUCK","CTRL","HHHH","SEXY","OJBK","POOR","OH-NO!","MONK","SHIT","THAN-K","MALO","ATM-er","THIN-K","SOLO","LOVE-R","WOC!","DRUNK","IMFW","JOKE-R","Dior-s"
)

function TryDownload([string]$code, [string]$ext) {
  $normalized = $code.Replace("!","")
  $url = "https://www.sbti.ai/images/types/$normalized.$ext"
  $out = Join-Path $OutDir "$code.$ext"
  try {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing | Out-Null
    if ((Get-Item $out).Length -gt 2000) { return $true }
    Remove-Item -Force $out -ErrorAction SilentlyContinue
  } catch {
    if (Test-Path $out) { Remove-Item -Force $out -ErrorAction SilentlyContinue }
  }
  return $false
}

foreach ($code in $codes) {
  if (Test-Path (Join-Path $OutDir "$code.png")) { continue }
  if (TryDownload $code "png") { continue }
  if (TryDownload $code "webp") { continue }
  [void](TryDownload $code "jpg")
}

Write-Host "Done. Avatars saved to: $OutDir"
