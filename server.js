//Import app file
const app = require("./backend/app")
//Server is listening on PORT 3000
app.listen(3000, () => {
    console.log("Server is listening on PORT 3000");
});