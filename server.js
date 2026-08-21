require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }

    console.log(`Server is running on port: ${PORT}`);
});