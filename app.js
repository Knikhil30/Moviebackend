const express = require("express");
const fs = require("fs");
let reviewObj = require("./review.json");

const app = express();
const route = express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());

route.get("/", (req, res) => {
    res.status(200).json({ msg: "done" });
});

route.put("/set_review", (req, res) => {

    let body = req.body;
    let movie_id = body.movie_id;
    let movie_review = body.review;

    if (movie_id in reviewObj) {
        reviewObj[movie_id].push(movie_review);
    } else {
        reviewObj[movie_id] = [];
        reviewObj[movie_id].push(movie_review);
    }

    fs.writeFileSync("./review.json", JSON.stringify(reviewObj, null, 2));

    res.status(200).json({ msg: "done" });
});

route.post("/get_review", (req, res) => {

    let body = req.body;
    let movie_id = body.movie_id;

    let review_data = [];

    if (movie_id in reviewObj) {
        review_data = reviewObj[movie_id];
    }

    res.status(200).json({ review_data });
});

app.use("/", route);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});