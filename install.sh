cd client
npm install
npm run build
mv dist ../server/frontend
cd ../server
npm install
npm run build
npm run start