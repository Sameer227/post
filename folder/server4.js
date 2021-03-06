const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
var app = express()
const cors = require('cors')
app.use(cors({ origin: "*" }))
app.use(bodyParser.json())
const fs = require('fs');
const contents = fs.readFileSync('./server.js', { encoding: 'base64' });
console.log(contents);
let token = "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";
let user = "sameer227"
//list all repo's


app.post('/list', async (req, res) => {

    await axios.get(`https://api.github.com/users/${user}/repos`, { data: "data" }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(resp => {
        console.log(resp);
        res.send(resp.data);
    })
})

app.post('/repo/create', async (req, res) => {

    await axios.post(`https://api.github.com/user/repos`, { name: req.body.name }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(resp => {
        console.log(resp);
        res.send(resp.data)
    })
})


axios.put(`https://api.github.com/repos/${user}/PostManTest/contents/folder/server4.js`, {
    owner: user,
    repo: 'PostManTest',
    path: 'folder/server4.js',
    message: "test1",
    committer: {
        name: "sameer Soni",
        email: "sameer.soni9227@gmail.com"
    },
    "content": contents,
    "branch": "master"
}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(resp => {
    console.log(resp);
    // res.send(resp.data)
}).catch(error => {
    console.log(error);
})

// axios.patch(`https://api.github.com/repos/${user}/PostManTest`, {
//     owner: user,
//     repo: 'PostManTest',
//     path: 'folder/server.js',
//     //message: "test1",
//     name: "post",
//     // committer: {
//     //     name: "sameer Soni",
//     //     email: "sameer.soni9227@gmail.com"
//     // },
//     "content": contents,
//     "branch": "master"
// }, {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// }).then(resp => {
//     console.log(resp);
//     // res.send(resp.data)
// }).catch((error) => {
//     console.log(error);
// })



app.listen(5000, console.log("server is running"));