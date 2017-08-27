var shoppingList = {
	items: [],
	addItem: function(itemText){
		if(this.items.length === 0){
			this.items.push({	
				itemText: itemText,
				completed: false
			});
			return true;
		}
		else{
			for(var i=0; i < this.items.length; i++){			
				if(this.items[i].itemText === itemText){
					alert('Item already in the list.');
					return false;
				}
			}			
			this.items.push({	
				itemText: itemText,
				completed: false
			});
			return true;		
		}			
	},
	sortItem: function(){
    	this.items.sort(function (a,b){
			var itemA = a.itemText.toUpperCase();
  	  		var itemB = b.itemText.toUpperCase();
 	   		var comparison = 0;

 	   		if (itemA > itemB) {
    			comparison = 1;
  	  		} 
  	  		else if (itemA < itemB) {
    			comparison = -1;
  	  		}
  			return comparison;
		});
	},
	changeItem: function(position, itemText){
		this.items[position].itemText = itemText; 
	},
	deleteItem: function(position){
		this.items.splice(position, 1);
	}
};


var handlers = {
	addItem: function(){
		var addItemTextInput = document.getElementById('addItemTextInput');
		if(addItemTextInput.value === ''){
			alert("Please add an item.");
			document.getElementById('addItemTextInput').focus();
			return false;
		}
		else{
			shoppingList.addItem(addItemTextInput.value);
			addItemTextInput.value = '';
			view.displayItems();
		//	return true;
		}
	},
	sortItem: function(){
		shoppingList.sortItem();
		view.displayItems();
	},
	changeItem: function(position){
		var changeItemTextInput = document.getElementById('changeItemTextInput');
		if(changeItemTextInput.value === ''){
			alert("Please enter the updated item.");
			document.getElementById('changeItemTextInput').focus();
		}
		else{
			shoppingList.changeItem(position, changeItemTextInput.value);
			changeItemTextInput.value = '';
			view.displayItems();
		}
	},
	moveItem: function(position){
		var itemsUl = document.querySelector('ul.list2');
		var itemLi = document.createElement('li');
		var children = itemsUl.children.length + 1;
		itemLi.setAttribute('id', children);
		itemLi.appendChild(document.createTextNode(shoppingList.items[position].itemText));
		itemsUl.appendChild(itemLi);
		shoppingList.items.splice(position,1);
		view.displayItems();
	},
	deleteItem: function(position){
		//debugger;
		shoppingList.deleteItem(position);
		view.displayItems();
	},
	cleanPurchasedList: function(){
		//debugger;
		var list2 = document.querySelector('ul.list2');
		if(list2){
			while(list2.firstChild){
				list2.removeChild(list2.firstChild);
			}
		}
		view.displayItems();	
	}

};


var view ={
	displayItems: function(){
		//debugger;
		var itemsUl = document.querySelector('ul.list1');
		var list2 = document.querySelector('ul.list2');
		itemsUl.innerHTML = '';
		
		shoppingList.items.forEach(function(item, position){
			var itemLi = document.createElement('li');
			var itemText = item.itemText + ' ';			
			
			itemLi.id = position;
			itemLi.textContent = itemText;
			itemLi.appendChild(this.createItemRadioButton());
			itemsUl.appendChild(itemLi);
		}, this);

		if(list2.children.length>0){
			document.getElementById('cleanPurchasedButton').disabled = false;
		}
		else{
			document.getElementById('cleanPurchasedButton').disabled = true;	
		}
	},
	createItemRadioButton: function(){
		var itemRadioButton = document.createElement('input');
		itemRadioButton.type = 'radio';
		itemRadioButton.className = 'itemRadioButton';
		itemRadioButton.name = 'listItem';
		return itemRadioButton;
	},
	setUpEventListeners: function(){
		document.getElementById('moveButton').addEventListener('click', function(){
			//debugger;
			// Get the element that was clicked
			var elementClicked = event.target;

			// Check if elementChecked is a button
			if(elementClicked.className === 'moveButton'){
				 
				for(var i=0; i<shoppingList.items.length;i++){
					if(document.getElementById(i).children[0].checked === true){
						//Get the li id
						handlers.moveItem(parseInt(document.getElementById(i).children[0].parentNode.id));
					}
				}
			}	 
		});

		document.getElementById('deleteButton').addEventListener('click', function(){
			var elementClicked = event.target;
			if(elementClicked.className === 'deleteButton'){
				for(var i=0; i<shoppingList.items.length;i++){
					if(document.getElementById(i).children[0].checked === true){
						//Get the li id
						handlers.deleteItem(parseInt(document.getElementById(i).children[0].parentNode.id));
					}
				}
			}
		
		});

		document.getElementById('changeButton').addEventListener('click', function(){
			var elementClicked = event.target;
			//debugger;
			if(elementClicked.className === 'changeButton'){
				for(var i=0; i<shoppingList.items.length;i++){
					if(document.getElementById(i).children[0].checked === true){
						//Get the li id
						handlers.changeItem(parseInt(document.getElementById(i).children[0].parentNode.id));
					}
				}
			}
		});

	}

};

view.setUpEventListeners();