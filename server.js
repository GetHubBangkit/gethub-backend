const http = require("http");
const app = require("./app");
const port = 8080;
const host = 'http://localhost';

const server = http.createServer(app);

app.listen(port, () => {
  console.log(`Server berjalan di ${host}:${port}`);
});
