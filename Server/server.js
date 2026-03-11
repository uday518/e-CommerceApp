const express = require('express');
const mongoose = require('mongoose');

mongoose
.connect("mongodb+srv://udaysah:alexking@cluster0.i3mazbf.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB connected"))
.catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));