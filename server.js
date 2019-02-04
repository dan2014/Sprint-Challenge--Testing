const server = require("./index");
const port = 3300;

server.listen(port, () => console.log(`Server is listening on ${port}`))