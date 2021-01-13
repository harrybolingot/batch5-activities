class Store{
	constructor(name){
        this.name = name;
        this.earnings = 0;
        this.currentInventoryList = [];
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
                newBook.quantity = prompt("Enter quantity of new book:");
                newBook.value = prompt("Enter price of new book:");
                this.currentInventoryList.push(newBook);
        
                console.log(`New title added: ${newBook.quantity} ${(newBook.quantity == 1) ? "copy" : "copies"} of \"${newBook.title}\" at \₱${newBook.value}${(newBook.quantity == 1) ? "!" : " each!"}`);
            }
            
        }
    }

    restockBook(title, quantity){
        let bookToRestock = this.currentInventoryList.find(function(inventory, index){
            if(inventory.title == title){
                inventory.quantity += quantity;
                return inventory;
            }
        });

        if(bookToRestock) console.log(`The title of the stock \"${bookToRestock.title}\" is updated from ${bookToRestock.quantity-quantity} to ${bookToRestock.quantity}.`);
        else console.log(`The title \"${title}\" is currently not in our inventory.`);
    }
    
    sellBook(title, quantity){
        let bookToSell = this.currentInventoryList.find(function(inventory, index){
            if(inventory.title == title){
                return inventory;
            }
        });

        if(bookToSell){
            if(bookToSell.quantity == 0) {
                console.log(`Sorry, we don't have copies available for \"${bookToSell.title}\"...`);
            }
        
            else if (quantity > bookToSell.quantity){
                console.log(`Sorry, only ${bookToSell.quantity} ${(bookToSell.quantity == 1) ? "copy" : "copies"} left available for ${bookToSell.title}...`);
            }
        
            else if (quantity <= bookToSell.quantity && quantity > 0){
                this.earnings += quantity*bookToSell.value;
                bookToSell.quantity -= quantity;
                
                console.log(`Successful transaction!\n${quantity} ${(bookToSell.quantity == 1) ? "copy" : "copies"} of ${title} sold!\nTotal cost: \₱${quantity*bookToSell.value}`);
            }

            else console.log(`No copy of the title \"${title}\" will be sold.`);
        }

        else console.log(`The title \"${title}\" is currently not in our inventory.`);
    }
    
    totalEarnings(){
        console.log(`Our total earnings at ${this.name} is currently: \₱${this.earnings}!`);
    }
    
    listInventory(){
        var printInventoryMessage = "";
            for(var i = 0; i < this.currentInventoryList.length; i++){
            printInventoryMessage += ((i+1) + ". " + this.currentInventoryList[i].title + ", ₱" + this.currentInventoryList[i].value + " each, " + this.currentInventoryList[i].quantity + ((this.currentInventoryList[i].quantity == 1) ? " copy " : " copies ") + "in stock\n");
        }
        console.log(`${this.name} currently holds ${this.currentInventoryList.length} titles.\n${printInventoryMessage}`);
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