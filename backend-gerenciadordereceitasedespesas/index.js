require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

let id = 3;

const receitas = [
    {
        id: 1,
        descricao: "R$450,00",
        finalizada: false
    },
    {
        id: 2,
        descricao: "R$360,00",
        finalizada: false
    }
];

//http://localhost:3000/receitas (GET)
app.get("/receitas", (req, res) =>{
    res.json({receitas});
})
//http://localhost:3000/receitas (POST)
app.post("/receitas", (req, res) =>{
    const r = req.body;
    receitas.push({id: id, descricao: r.descricao, finalizada: r.finalizada});
    id++;
    res.json({receitas});
})

app.put('/receitas', (req, res) => {
    const index = receitas.findIndex(r => r.id === req.body.id);
    receitas[index] = {...req.body};
    res.json({receitas});
})



app.listen (process.env.PORT, () => console.log('up and running'));