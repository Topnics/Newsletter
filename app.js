const express = require('express')
const request = require("request");
const app = express(); 
const bodyParser = require("body-parser");
const https = require("https");






app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");

});
app.post("/", (req, res)=>{
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/f40179d57e";

    const options = {
        method: "POST",
        auth: "temi1:4db1cc972e4d97f05a7624b79beece84-us8"


    }

    const request = https.request(url, options, function(response){
        
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }

            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
    })
    request.write(jsonData);
    request.end();

});
app.post("/failure", (req, res)=>{
    res.redirect("/");
})

app.listen(3000, () => {
    console.log('This app listens on port 3000')
})

// API KEY
// 4db1cc972e4d97f05a7624b79beece84-us8

// Unique-Id
// f40179d57e



// mailchimp.setConfig({
//   apiKey: "4db1cc972e4d97f05a7624b79beece84-us8",
//   server: "us8"
// });

// const listId = "YOUR_LIST_ID";
// const subscribingUser = {
//   firstName: "Prudence",
//   lastName: "McVankab",
//   email: "prudence.mcvankab@example.com"
// };

// async function run() {
//   const response = await mailchimp.lists.addListMember(listId, {
//     email_address: subscribingUser.email,
//     status: "subscribed",
//     merge_fields: {
//       FNAME: subscribingUser.firstName,
//       LNAME: subscribingUser.lastName
//     }
//   });

//   console.log(
//     `Successfully added contact as an audience member. The contact's id is ${
//       response.id
//     }.`
//   );
// }

// run();