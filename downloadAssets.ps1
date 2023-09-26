
# Define the URL of the file and the path where it will be saved
$url = "https://drive.google.com/uc?export=download&confirm=1&id=1BxYDMrDyrGWe1HDvO_Axm0fTXycBaquS"
$outputFilePath = ".\assets.zip"

# Download the file
Invoke-WebRequest -Uri $url -OutFile $outputFilePath

# Define the folder where the file will be extracted
$extractFolderPath = ".\src\assets"

# Unzip the file
Expand-Archive -Path $outputFilePath -DestinationPath $extractFolderPath -Force

Write-Host "File downloaded and extracted successfully!" -ForegroundColor Green
