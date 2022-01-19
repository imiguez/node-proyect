"use strict";

const express = require('express');
const pool = require('../db/connection');


const router = express.Router();


router.get("/add", (req, res) => {
    res.render('pages/posts/add');
});

router.post("/add", async (req, res) => {
    const { name, lastname, username, password } = req.body;
    if (!name || !lastname || !username || !password) {
        res.render('posts/add');
        return ;
    }
    let user = {
        name,
        lastname,
        username,
        password,
        permission: 0 // Regular user has not permissions
    };
    res.send("posted: " + user);
    console.log(user);
    await pool.query("INSERT INTO user set ?", user);
});

module.exports = router;