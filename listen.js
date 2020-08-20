const { PORT = 9094 } = process.env;

const app = require("./server")

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));