const express = require("express")
const path = require("path")

const app = express()
const publicFolderPath = path.join(__dirname, "public")

app.use(express.json())
app.use(express.static(publicFolderPath))

const users = []

app.post(`/api/user` , (req , res) => {
  console.log( req.body );
  const userInput = req.body;
  if ( checkValidUserName( userInput ) ){
    assignUserID( userInput )
    res.status(201);
    users.push(userInput);
    console.log(users);
    res.send({ userInput });
  }else{
    res.status(409);
    res.send({message: 'username already taken'})
  }
})

function checkValidUserName( userInput ){
  if ( !users ){
    return 1;
  }else{
    for( let numOfUser = 0 ; numOfUser < users.length ; numOfUser++ ){
      if( users[ numOfUser ].userName === userInput.userName ){
        return 0;
      }
    }return 1;
  }
}

function assignUserID( userInput ){
  userInput.ID = Math.floor(Math.random() * 1000);
}

app.listen(3000 , () => console.log('running on port 3000 of localhost'));