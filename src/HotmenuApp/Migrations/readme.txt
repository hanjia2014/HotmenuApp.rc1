1. open command prompt
2. run command "dnvm upgrade", if dnvm is not revignized as internal or external command, go to https://github.com/aspnet/home to install dnvm manually by running 

@powershell -NoProfile -ExecutionPolicy unrestricted -Command "&{$Branch='dev';$wc=New-Object System.Net.WebClient;$wc.Proxy=[System.Net.WebRequest]::DefaultWebProxy;$wc.Proxy.Credentials=[System.Net.CredentialCache]::DefaultNetworkCredentials;Invoke-Expression ($wc.DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))}"

from Datacom use "dnvm upgrade -Proxy DNZWGPX2.datacom.co.nz:80" as proxy server

3. go to the directory where contains the project.json file
4. run command "dnu restore"
from datacom use "dnu restore -p DNZWGPX2.datacom.co.nz:80"

5. run command "dnx ef"
6. run command "dnx ef migrations add InitialDatabase -c HotmenuDbContext" to generate migration cs code
7. run command "dnx ef migrations script -o initialDatabase.sql -c HotmenuDbContext" to generate sql script

example: 
-- dnx ef migrations apply -c ApplicationDbContext
note: the database needs to be manually created




npm
-- in order to generate source map files for ts code, need to install typescript manually
-- run "npm install -g typescript"
-- open command prompt
-- use cmd go to the folder that contains ts files
-- run "tsc -sourcemap xxx.ts"

install npm behind a proxy (datacom)
npm config set proxy "http://hanj:Welcome11@DNZWGPX2.datacom.co.nz:80/"
npm config set https-proxy "http://hanj:Welcome11@DNZWGPX2.datacom.co.nz:80/"
