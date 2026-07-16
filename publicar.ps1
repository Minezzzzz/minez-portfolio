[CmdletBinding()]
param(
  [string]$Mensagem = "Atualiza o portefólio"
)

$ErrorActionPreference = "Stop"
$Repositorio = Split-Path -Parent $MyInvocation.MyCommand.Path

Push-Location $Repositorio
try {
  if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "O Git não está instalado ou não está disponível no PATH."
  }

  git add --all
  git diff --cached --quiet

  if ($LASTEXITCODE -eq 0) {
    Write-Host "Não existem alterações novas para publicar."
    exit 0
  }

  git commit -m $Mensagem
  if ($LASTEXITCODE -ne 0) {
    throw "Não foi possível criar o commit."
  }

  git push
  if ($LASTEXITCODE -ne 0) {
    throw "Não foi possível enviar as alterações para o GitHub."
  }

  Write-Host "Alterações enviadas. A publicação automática vai manter o mesmo endereço."
}
finally {
  Pop-Location
}
