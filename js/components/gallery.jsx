import React from 'react';
import GalleryMenu from '../components/galleryMenu.jsx';
import GalleryContent from '../components/galleryContent.jsx';
import ShoeCard from '../components/shoeCard.jsx';
import * as firebase from "firebase";

//firebase config
const config = {
    apiKey: "AIzaSyAYC0OIRwJhDEo2Plp04be3Kp_npG8FpeE",
    authDomain: "jshoes-27190.firebaseapp.com",
    databaseURL: "https://jshoes-27190.firebaseio.com",
    projectId: "jshoes-27190",
    storageBucket: "jshoes-27190.appspot.com",
    messagingSenderId: "64348641405"
};

// Initialize the default app
var defaultApp = firebase.initializeApp(config);

// You can retrieve services via the defaultApp variable...
var defaultStorage = defaultApp.storage();
var defaultDatabase = defaultApp.database();

// ... or you can use the equivalent shorthand notation
defaultStorage = firebase.storage();
defaultDatabase = firebase.database();

firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;

  } else {
    // User is signed out.
  }
});



class Gallery extends React.Component {


constructor() {
    super();
    this.state = {
        searchText: '',
        initialItems: [],
        searchItems: [],
        searchColors: [],
        shoppingItems: [],
        menuButtons: Array(4).fill(false),
        checkColors: Array(4).fill(false),
        checkPrice: Array(2).fill(false),
        showBasket: false,
        isLoading: false,
        error: null
    };
}



componentDidMount() {

    let hash = window.location.href.split('#')[1];
    let index;

    if(hash == "men"){
      index = 0;
    }
    if(hash == "wom"){
      index = 1;
    }
    if(hash == "kids"){
      index = 2;
    }
    if(hash == "sale"){
      index = 3;
    }

    this.setState({isLoading: true});

    if(index){
      this.showItems(index);
      let arr = this.state.menuButtons;
      arr[index] = true;
      this.setState({menuButtons: arr});
    }else {
      this.showItems(0);
      let arr = this.state.menuButtons;
      arr[0] = true;
      this.setState({menuButtons: arr});
    }

    //get shopping items
    this.getShoppingItems();

}


showItems = (n) => {

  var ref = firebase.database().ref();

      ref.on("value", snapshot => {

        this.setState({initialItems: snapshot.val().shoes[n].types,
                         searchItems: snapshot.val().shoes[n].types,
                         isLoading: false
                        })
        console.log(snapshot.val().shoes[1]);

      }, function (error) {
            console.log("Error: " + error.code);
      });

}


//show basket items
showBasketItems = () => {

    this.getShoppingItems();
    this.setState({showBasket: true,
                   menuButtons: Array(4).fill(false),
                   checkColors: Array(4).fill(false),
                   checkPrice: Array(2).fill(false),
                   searchColors: []
                 })

}


//show shopping items
getShoppingItems = () => {

  var ref = firebase.database().ref('shoppingCart');
  ref.on("value", snapshot => {
        let arr = [];

        snapshot.forEach(elem => {
          let shopObj = elem.val();
          const serverKey = elem.key;
          shopObj.skey = serverKey;
          arr.push(shopObj)
        })

        this.setState({shoppingItems: arr});

      }, function (error) {
        console.log("Error: " + error.code);
      });

}

//menu buttons onCLick method
onMenuButtonClick=(index)=> {
    this.showItems(index);
    let arr = Array(4).fill(false);
    arr[index] = true;
    this.setState({menuButtons: arr,
                  checkColors:Array(4).fill(false),
                  checkPrice:Array(2).fill(false),
                  searchColors:[],
                  searchText: "",
                  showBasket: false
                 });
  }


//handle seach text
handleSearchText = (event) => {
    this.setState({searchText: event.target.value},
    ()=>this.searchList(this.state.searchText));
}


//search items
searchList=(elem)=> {

    this.setState({searchColors: [],
                  checkColors: Array(4).fill(false),
                  checkPrice:Array(2).fill(false),
                  showBasket: false
                 })

    let updatedList = this.state.initialItems;

    //filter list
    updatedList = updatedList.filter(function(item){
      return item.name.toLowerCase().search(
          elem.toLowerCase()) !== -1;
     });

    this.setState({searchItems: updatedList});

}



removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

//sorting price
sortPrice=(e)=> {

    this.setState({searchItems: this.state.initialItems,
                   searchText: "",
                   checkColors:Array(4).fill(false),
                   searchColors:[],
                   showBasket: false
                 });


    if(e.target.value === "asc"){
        let arr = this.state.checkPrice;
        arr[0] = !arr[0];
        arr[1] = false;
        this.setState({checkPrice: arr}, ()=> {
          if(this.state.checkPrice[0]) {
            this.sortItems("asc");
          }else {
            this.setState({searchItems: this.state.initialItems})
          }
        })
    }

    if(e.target.value === "desc"){
        let arr = this.state.checkPrice;
        arr[1] = !arr[1];
        arr[0] = false;
        this.setState({checkPrice: arr}, ()=> {
          if(this.state.checkPrice[1]) {
            this.sortItems("desc");
          }else {
            this.setState({searchItems: this.state.initialItems})
          }
        })
    }

}


sortItems(ascDesc)  {
    let sortedItems = this.state.initialItems.slice();

    sortedItems.sort(function(a, b) {
      if(ascDesc === "asc") {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      if(ascDesc === "desc") {
        return parseFloat(b.price) - parseFloat(a.price);
      }
    });

    this.setState({searchItems: sortedItems})

}


//color filtering
filterColor=(e)=> {
    this.setState({searchItems: this.state.initialItems,
                   searchText: "",
                   checkPrice: Array(2).fill(false),
                   showBasket: false
                 });


    if(e.target.value === "red"){
        let arr = this.state.checkColors;
        arr[0] = !arr[0];
        this.setState({checkColors: arr})
    }

    if(e.target.value === "black"){
        let arr = this.state.checkColors;
        arr[1] = !arr[1];
        this.setState({checkColors: arr})
    }

    if(e.target.value === "green"){
        let arr = this.state.checkColors;
        arr[2] = !arr[2];
        this.setState({checkColors: arr})
    }

    if(e.target.value === "blue"){
        let arr = this.state.checkColors;
        arr[3] = !arr[3];
        this.setState({checkColors: arr})
    }


    let newColorList = this.state.searchColors;
    if(this.state.searchColors.indexOf(e.target.value) == -1){
      newColorList.push(e.target.value);
      this.setState({searchItems: newColorList});
    } else {
      this.removeA(newColorList,e.target.value);
    }

    this.showItemsColors(newColorList);

}



showItemsColors = (arr) => {
    let colorsArr = arr;
    let newSearchItems = [];

    if (colorsArr.indexOf("red") !== -1) {
        var updatedListRed = this.state.initialItems;
        updatedListRed = updatedListRed.filter(function(item) {
            return item.color === "red";
        });
        for (var i = 0; i < updatedListRed.length; i++) {
            newSearchItems.push(updatedListRed[i]);
        }
    }

    if (colorsArr.indexOf("black") !== -1) {
        var updatedListBlack = this.state.initialItems;
        updatedListBlack = updatedListBlack.filter(function(item) {
            return item.color === "black";
        });
        for (var i = 0; i < updatedListBlack.length; i++) {
            newSearchItems.push(updatedListBlack[i]);
        }
    }

    if (colorsArr.indexOf("green") !== -1) {
        var updatedListGreen = this.state.initialItems;
        updatedListGreen = updatedListGreen.filter(function(item) {
            return item.color === "green";
        });
        for (var i = 0; i < updatedListGreen.length; i++) {
            newSearchItems.push(updatedListGreen[i]);
        }
    }

    if (colorsArr.indexOf("blue") !== -1) {
        var updatedListBlue = this.state.initialItems;
        updatedListBlue = updatedListBlue.filter(function(item) {
            return item.color === "blue";
        });
        for (var i = 0; i < updatedListBlue.length; i++) {
            newSearchItems.push(updatedListBlue[i]);
        }
    }

    if (newSearchItems.length > 0) {
        this.setState({searchItems: newSearchItems});
    } else {
        this.setState({searchItems: this.state.initialItems});
    }

}


//add item to shopping cart
addItem = (elem) => {

    var ref = firebase.database().ref('shoppingCart/');

    let arr1 = [];

    this.state.shoppingItems.forEach(el => {
      arr1.push(el.id === elem.id);
    })

    if(!(arr1.some(x => x === true))) {
        ref.push(elem);
    }

    this.setState({addItem: true})



//remove item from shopping cart
removeItem = (elem) => {

      this.setState({addItem: true})

      var ref = firebase.database().ref('shoppingCart');
      ref.child(elem.skey).remove();

}



  render() {

    const {isLoading, error } = this.state;

    let items;

    if(this.state.showBasket){
      items = this.state.shoppingItems;
    } else {
      items = this.state.searchItems;
    }


    if (error) {
      return <p style={{color:"white", fontSize: "24px", paddingLeft: "50px"}}>{error.message}</p>;
      }

    if (isLoading) {
      return <p style={{color:"white", fontSize: "24px", paddingLeft: "50px"}}>Loading ...</p>;
    }

    return (
      <div className="galleryContainer">

                <GalleryMenu onMenuButtonClick={this.onMenuButtonClick}
                             searchList={this.searchList}
                             filterColor={this.filterColor}
                             sortPrice={this.sortPrice}
                             showBasketItems={this.showBasketItems}
                             handleSearchText={this.handleSearchText}
                             checkColors={this.state.checkColors}
                             checkPrice={this.state.checkPrice}
                             searchText={this.state.searchText}
                             menuButtons={this.state.menuButtons}
                             itemsQnt={this.state.shoppingItems.length}
                             addItem={this.state.addItem}
                />

              <GalleryContent>
                 {(this.state.shoppingItems.length == 0 && this.state.showBasket)&&<div className="empty">no items</div>}
                 {items.map((elem,i)=>{
                    return (
                     <ShoeCard key={elem.id}
                               id={elem.id}
                               elem={elem}
                               addItem={this.addItem}
                               removeItem={this.removeItem}
                               isBasket={this.state.showBasket}
                               shoppingItems={this.state.shoppingItems}
                      />
                    )
                   })
                  }
              </GalleryContent>

      </div>
    )
  }
}


export default Gallery;
