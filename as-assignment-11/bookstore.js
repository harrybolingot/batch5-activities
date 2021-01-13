class Store{
	constructor(name){
        this.name = name;
        this.earnings = 0;
        this.currentInventoryList = [];

        console.log(`New store created: nbs\n\nAccess the following functions under this store by invoking the following:\n1. addBook()\n2. restockBook(title, quantity)\n3. sellBook(title, quantity)\n4. totalEarnings()\n5. listInventory()`);
    }
  
    addBook(book){
        if(book) {
            this.currentInventoryList.push(book);
        
            console.log(`New title added: ${book.quantity} copies of \"${book.title}\" at \₱${book.value} each!`);
        }
        
        else {
            let newBook = new Book();
            newBook.title = prompt("Enter title of new book:");
            
            let bookAlreadyPresent = this.currentInventoryList.find(function(inventory, index){
                if(inventory.title == newBook.title){
                    return inventory;
                }
            });

            if(bookAlreadyPresent){
                console.log(`Cannot add \"${newBook.title}\" as it is already in our inventory.`)
            }

            else {
                newBook.quantity = parseInt(prompt("Enter quantity of new book:"));
                newBook.value = parseInt(prompt("Enter price of new book:"));
                this.currentInventoryList.push(newBook);
        
                console.log(`New title added: ${newBook.quantity} ${(newBook.quantity == 1) ? "copy" : "copies"} of \"${newBook.title}\" at \₱${newBook.value}${(newBook.quantity == 1) ? "!" : " each!"}`);
            }
            
        }
    }

    restockBook(title, quantity){
        if(quantity || quantity == 0){
            let bookToRestock = this.currentInventoryList.find(function(inventory, index){
                if(inventory.title == title){
                    return inventory;
                }
            });

            if (quantity < 1){
                console.log(`The title \"${title}\" will not be restocked.`);
            }

            else if(bookToRestock && quantity > 0){
                bookToRestock.quantity += quantity;
                console.log(`The title of the stock \"${bookToRestock.title}\" is updated from ${bookToRestock.quantity-quantity} to ${bookToRestock.quantity}.`);
            } 

            else console.log(`The title \"${title}\" is currently not in our inventory.`);
        }

        else console.log(`Cannot restock ${title} without proper quantity!`);
    }
    
    sellBook(title, quantity){
        if(quantity || quantity == 0){
            let bookToSell = this.currentInventoryList.find(function(inventory, index){
                if(inventory.title == title){
                    return inventory;
                }
            });

            if (quantity < 1){
                console.log(`The title \"${title}\" will not be sold.`);
            }

            else if(bookToSell && quantity > 0){
                if(bookToSell.quantity == 0) {
                    console.log(`Sorry, we don't have copies available for \"${bookToSell.title}\"...`);
                }
            
                else if (quantity > bookToSell.quantity){
                    console.log(`Sorry, only ${bookToSell.quantity} ${(bookToSell.quantity == 1) ? "copy" : "copies"} left available for ${bookToSell.title}...`);
                }
            
                else if (quantity <= bookToSell.quantity){
                    this.earnings += quantity*bookToSell.value;
                    bookToSell.quantity -= quantity;
                    
                    console.log(`Successful transaction!\n${quantity} ${(bookToSell.quantity == 1) ? "copy" : "copies"} of ${title} sold!\nTotal cost: \₱${quantity*bookToSell.value}`);
                }

                else console.log(`The title \"${title}\" is currently not in our inventory.`);
            }
    
            else console.log(`The title \"${title}\" is currently not in our inventory.`);
        }

        else console.log(`Cannot sell ${title} without proper quantity!`);
        
    }
    
    totalEarnings(){
        console.log(`Our total earnings at ${this.name} is currently: \₱${this.earnings}!`);
    }
    
    listInventory(){
        var printInventoryMessage = "";
        var totalCopies = 0;
            for(var i = 0; i < this.currentInventoryList.length; i++){
            totalCopies += this.currentInventoryList[i].quantity;
            printInventoryMessage += ((i+1) + ". " + this.currentInventoryList[i].title + ", ₱" + this.currentInventoryList[i].value + " each, " + this.currentInventoryList[i].quantity + ((this.currentInventoryList[i].quantity == 1) ? " copy " : " copies ") + "in stock\n");
        }
        console.log(`${this.name} currently holds ${this.currentInventoryList.length} titles, with a cumulative number of ${totalCopies} copies.\n${printInventoryMessage}`);
    }
}

class Book{
	constructor(title, quantity, value){
  	this.title = title;
    this.quantity = quantity;
    this.value = value;
  }
}

sampleBook1 = new Book("A Song of Ice and Fire", 2, 500);
sampleBook2 = new Book("Game of Thrones", 3, 200);

var nbs = new Store("National Book Store");

nbs.addBook(sampleBook1);
nbs.addBook(sampleBook2);