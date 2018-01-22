import React from 'react';


class ShoeCard extends React.Component {

  constructor() {
    super();
    this.state = {
      showItem: false
    };
  }


  showHideItem = () => {
    this.setState({
      showItem: !this.state.showItem
    })

  }

  render() {

    const {name,price,src} = this.props.elem;

    return (
      <div className={`shoeCard ${(this.state.showItem)&& "show"}`} onClick={this.showHideItem}>
        <div className="container">
          <div className="elements-wrapper">
            <p className="card-title">{name}</p>
            <p className="card-price">{price}</p>
            <img className="card-image" onClick={this.showHideItem} src={src} />
            {this.props.isBasket
                ? <a className="btn-del" onClick={()=>this.props.removeItem(this.props.elem)}></a>
                : <a className={`btn-add ${(this.props.shoppingItems.some(item => item.id === this.props.id))&& "added"}`} onClick={()=>this.props.addItem(this.props.elem)}></a>
            }
          </div>
        </div>
      </div>
    )

  }
}

export default ShoeCard;
