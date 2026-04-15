cd client
call npm install
call npm run build
xcopy dist\* ..\server\frontend /Y /I /E
cd ../server
call npm install
call npm run build
call npm run start