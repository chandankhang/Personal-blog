import express from "express";

const app= express();
const port = 3000;


let posts= [];

app.use(express.static("public"));


app.use(express.urlencoded({extended:true}));


app.get("/", function(req, res) {
     res.render("index.ejs",{ posts: posts });
});

app.post("/create", (req, res)=> {
  // bring title and content from form
  const newPost = {
    title: req.body.title, // title mangaya
    content: req.body.content,
    };

    // post ko array me add karo
    posts.push(newPost);
    // homepage pe redirect karo

    res.redirect("/");

});

// GET route for edit form
app.get("/edit/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if(index >= 0 && index < posts.length){
     const post = posts[index];
  res.render("edit.ejs", {post : post, index : index});
  } else{
    res.redirect("/"); // Invalid index pe homepage pr bhejo
  }
 
});

// POST route for updating post
app.post("/update/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if(index >= 0 && index < posts.length) {
    posts[index] = { 
    title : req.body.title, 
    content : req.body.content,
  };
  res.redirect("/");
  } else {
    res.redirect("/");
  }
  
});

// POST route for deleting post
app.post("/delete/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if(index >=0 && index < posts.length) {
    posts.splice(index,1);
  res.redirect("/");
  } else {
    res.redirect("/");
  }
  
});

app.listen(port, function () {
  console.log( `Server listening on port ${port}!`);
})

