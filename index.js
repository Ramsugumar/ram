
const express= require('express');
const app= express();
const importData=require("./data.json");
app.use(express.json());

const courses =[
    { id:1, name:  'ram'},
    { id:2, name: 'sam' },
    {id:3, name: 'jam'},
];
app.get('/players',(req,res)=>{
    res.send(importData);
})
app.get('/',(req, res)=> {
    res.send('Hello World');
});

app.get('/api/courses',(req,res)=> {
    res.send(courses);
});


app.post('/api/courses',(req,res)=>{
    if(!req.body.name || req.body.name.length<3){
        res.status(400).send('Data Invalid');
        return;
    }
  const course={
         id: courses.length+1,
         name: req.body.name
  };
  courses.push(course);
  res.send(course);
});
app.get('/api/posts/:id',(req, res)=> {
    const course= courses.find(c => c.id === parseInt(req.params.id));
    if(!course)  res.status(404).send('The course was not found');
    res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.....`));