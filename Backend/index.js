import express from "express";

const app = express()
const port = 3000

app.get('/',(req,res) => {
    res.send('Hello World Rishav!')
})

app.post('/',(req,res)=>{
    res.send('Got a post req')
})

app.put('/user',(req,res) => {
    res.send('Got a put requst at /user')
})

app.delete('/user', (req,res) => {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})