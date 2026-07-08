# Captura screenshot da janela inteira do Chrome (desktop)
# Uso: .\scripts\capture-chrome-window.ps1 -FeatureName "login" -ScenarioName "CT01"

param(
  [string]$FeatureName = "feature",
  [string]$ScenarioName = "cenario"
)

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$outputDir = "cypress\evidencias\$FeatureName.feature"

if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
}

$outputFile = "$outputDir\${ScenarioName}_$timestamp.png"

$screen = [System.Windows.Forms.Screen]::PrimaryScreen
$bitmap = New-Object System.Drawing.Bitmap($screen.Bounds.Width, $screen.Bounds.Height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($screen.Bounds.Location, [System.Drawing.Point]::Empty, $screen.Bounds.Size)
$bitmap.Save((Resolve-Path ".").Path + "\" + $outputFile)
$graphics.Dispose()
$bitmap.Dispose()

Write-Host "Screenshot salva: $outputFile"
