var mysql = require("mysql");
var inquirer = require("inquirer");

// mysql database connection
var connection = mysql.createConnection({
    host: "localhost",

    // port
    port: 3306,

    // username
    user: "root",

    // database
    password: "",
    database: "bamazon_db"
});

// connection for mysql server and database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function to prompt user with questions
    startPurchase();
});

//1. show all the products then 2 questions: ID of the product they want to buy and the number of units
function startPurchase() {
    // 1. show all the products -- get this from mysql
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log('=============BAMAZON STORE==============')
        //show ID, product_name, department_name, and price -- do this with a for loop to run through all the different items
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + "\n" +
                "Product: " + res[i].product_name + "\n" +
                "Department: " + res[i].department_name + "\n" +
                "Price: " + res[i].price + "\n");
            console.log('-----------')
        }
        // 2. ask user questions: ID of item and amount they would like to buy
        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is the ID of the item you would like to buy?",
                    name: "userID"
                },
                {
                    type: "input",
                    message: "How many would you like to purchase?",
                    name: "userAmount",
                    //default: true
                }

            //3. Function to calculate the user's responses against the data in mysql
            ])
            .then(function (userResponse) {
                // search through mysql for the item the user selected
                var query = "Select product_name, department_name, price, stock_quantity FROM products WHERE ?";
                connection.query(query, { id: userResponse.userID }, function (err, res) {
                    if (err) throw err;
                    //variable for the amount of items left (call this next)
                    var stock_left = res[0].stock_quantity;

                    if (stock_left <= userResponse.userAmount) {
                        //let user know the item is in stock
                        console.log('Sorry that item is out of stock!');
                        // send the data to mysql -- call the updateData function here!
                            newPurchase();

                        } else {
                            //let user know the item is out of stock 
                            console.log("Your order has been placed!");
                            // update the data in mysql
                            connection.query('SELECT * FROM products WHERE stock_quantity', function(err, res){
                                if (err) throw err;
                                //the NEW stock quantity will be the current stock quantity minus the number the user selected
                                stock_quantity = res[0].stock_quantity - userResponse.userAmount;
                            })
                            // updateData();
                            newPurchase();
                        }

                });

            });

    });
};

//2. function to update the data in mysql (which will then update in the terminal)
// function updateData(){
//     // this is not working..
//     connection.query('SELECT * FROM products WHERE stock_quantity', function(err, res){
//         if (err) throw err;
//         //the NEW stock quantity will be the current stock quantity minus the number the user selected
//         stock_quantity = res[0].stock_quantity - userResponse.userAmount;
//     })
    

// };

//3. Function to prompt the user to place another order after the subsequent oreder is completed
function newPurchase(){
    //ask the user if they want to place another order
	inquirer.prompt([{
		type: 'confirm',
		name: 'anotherOrder',
        message: 'Would you like to place another order?'
    
	    }]).then(function(userResponse){
            //if yes, run the startPurchase function again
		    if(userResponse.anotherOrder){
			    startPurchase();
            }
            //if no, tell them thanks and end the connection
		    else{
			    console.log('Thank you for shopping at Bamazon!');
			    connection.end();
            }
            
	})
};





