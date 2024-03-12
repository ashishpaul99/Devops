// 2. Assigmenet - Lets create in memory hospital(logic is like a doctor)
// ->see image express3 
// ->data is stored in variable.

// Problem statement
// create 4 routes(4 things that the hospital can do)
// 1. GET - User can check how many kidneys they have and their health.
// 2. POST - User can add a new kidney.
// 3. PUT - User can replace a kidney, make it healthy.
// 4. DELETE - user can remove a kidney.

// ->When people go to hospital.com they can see their health of the kidney.
// ->user sends request ot add kidney,heal kidney, remove kidney, replace kidney to end point.
// ->backend should store information of the users.
// ->if request comes backend should update in the memory.


// Code:

// let start creating an memory in array 
// ->one kidney of the user is not healthy.
const express = require("express");
const app = express();
const port = 3000;

var users = [{ name: "john", kidneys: [{ healthy: false }, { healthy: true }] }];


app.get("/kidneyCountHealth", function (req, res) {
    // kidneys health
    const johnKidney = users[0].kidneys;
    console.log(johnKidney);

    // no. of kidneys
    const numberOfKidneys = johnKidney.length;

    // no. of healthy kidney
    let numberOfHealthyKidney = 0;
    for (let i = 0; i < johnKidney.length; i++) {
        if (johnKidney[i].healthy == true) {
            numberOfHealthyKidney++;
        }
    }


    // number of unhealthy kidney
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidney;
    res.json({
        johnKidney,
        numberOfKidneys,
        numberOfHealthyKidney,
        numberOfUnhealthyKidneys
    })

});


// 2. POST - User can add a new kidney.
// middleware to recieve body which is given in json form while sending request is sent.
app.use(express.json());
app.post("/addKidney", function (req, res) {
    const isHealthy = req.body.healthy;
    users[0].kidneys.push({ healthy: isHealthy });
    res.json({
        msg: "Done!"
    });

});

// 3. PUT - User can replace a kidney, make it healthy.
// ->replace all kidneys and make them well.
app.put("/makeKidneyHealthy", function (req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        "msg": "Done!"
    })

});

// 4. DELETE - user can remove a kidney.
// ->removing all unhealthy kidneys
app.delete("/removeUnhealthyKidneys", function (req, res) {
    // only if atleast one unhealthy kidney is there do this, else retrun 411
    if (thereIsAtleastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })

            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg: "done"
        })

    }
    else {
        res.status(411).json({
            msg: "you don't have any bad kidneys"
        });
    }

});

// check wheather there is atleast one unhealthy kidney
function thereIsAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}




app.listen(port, function () {
    console.log("clinic is open");
})

// Output:{"johnKidney":[{"healthy":false}],"numberOfHealthyKidney":0,"numberOfUnhealthyKidneys":1}

//=>Code Explaination:

// 1. POST - User can add a new kidney.
// ->In case of post request inputs are given in the body.
// ->add data in body->raw->json data(postman)
// ->In order to recieve json body in case of POST request a middleware is needed.

// app.use(express.json());
// ->as post request is sent number of kidneys get updated.
// check by typing url.
// ->we can update from mobile also.
// ->they will be common place for data.
// ->data can be updated from multiple devices.

// 3. PUT - User can replace a kidney, make it healthy.
// ->use postman to send put request.
// ->use req.json({}) to send data to user or client. it not request will hung in postman.
// ->if there are no unhealthy kidneys send 411 statusa code and message you don't have any bad kidneys.


// 4. DELETE - user can remove a kidney.
// ->removing all unhealthy kidneys
// ->check at least one unhealthy is presnt.
// ->if there is no unealthy kidney then send status code 411 and a message like "you don't have any bad kidneys".




// ->use get request to get kindney count and kidney healthy.
// ->by using post request user can add his kidneys.
// ->by using put request user can update and make kidney's well.
// ->by using delete request user can remove unhealthy kidneys.

// ->server checks
// 1. what should happen if they try to delete when there are no kidneys or all kidneys are healthy?
// ->it is wrong input
// ->return 411 status code ndicates that the server refuses to accept the request without a defined Content-Length header
// ->if atleast there is one unhealthy kidney run the logic else return 411 status code.
// ->if kidneys are healthy it should not show make healthy kidneys button.


// 2. What shoul happen if they are making a kidney healthy when all are already healthy.