iwr https://get.pnpm.io/install.ps1 -useb | iex;
git pull;
pnpm install -r;
./downloadAssets.ps1;