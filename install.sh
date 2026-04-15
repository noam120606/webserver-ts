cd client
npm install
npm run build
mv dist ../server/public
cd ../server
npm install
npm run build
npm run start