const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const Document = require("./models/Document");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/hcloned", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

let code = "Welcome to Tráfico de Drogas. O site porno mais gay que tem";

app.get("/", (req, res) => {
    res.render("saved-code", { code, language: "plaintext" });
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/save", async (req, res) => {
    const value = req.body.value;
    try {
        const document = await Document.create({ value });
        res.redirect(`/${document.id}`);
    } catch (e) {
        res.render("new", { value });
    }
});

app.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const document = await Document.findById(id);
        res.render("saved-code", { code: document.value });
    } catch (e) {
        res.redirect("/");
    }
});

app.listen(3000);
