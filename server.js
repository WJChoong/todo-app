const app = require("./app");
const PORT = process.env.PORT || 3000;
require('dotenv').config(); // import the env file

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
