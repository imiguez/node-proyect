"use strict";

const express = require('express');
const router = express.Router();
const pool = require('../db/connection');



router.get("/", (req, res) => {
    res.render('pages/home', { amount: [1,2,3,4,5,6]});
});

router.get("/login", (req, res) => {
    res.render('auth/login', { displayError: "none" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    let user = [
        username,
        password
    ];
    let exist = await pool.query("SELECT * FROM user WHERE username=? AND password=?", user);
    if (exist.length) {
        // start session
        res.redirect('/');
    } else res.render('auth/login', { displayError: "flex" });
});

router.get("/register", (req, res) => {
    res.render('auth/register');
});

router.post("/register", async (req, res) => {
    const { name, lastname, username, password } = req.body;

    let user = {
        name,
        lastname,
        username,
        password,
        permission: 0 // Regular user has not permissions
    };
    let response = await pool.query("INSERT INTO user set ?", user);
    console.log(response);
});

module.exports = router;
