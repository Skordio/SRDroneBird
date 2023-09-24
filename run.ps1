iwr https://get.pnpm.io/install.ps1 -useb | iex;
git pull;
pnpm install -r;

# Define the URL of the file and the path where it will be saved
$url = "https://drive.google.com/uc?id=1-11BM7ls2_FjbKdr1-96BZGc9RLn3CcX"
$outputFilePath = ".\assets.zip"

# Download the file
Invoke-WebRequest -Uri $url -OutFile $outputFilePath

# Define the folder where the file will be extracted
$extractFolderPath = ".\assets"

# Unzip the file
Expand-Archive -Path $outputFilePath -DestinationPath $extractFolderPath -Force

Write-Host "File downloaded and extracted successfully!" -ForegroundColor Green


pnpm run dev;