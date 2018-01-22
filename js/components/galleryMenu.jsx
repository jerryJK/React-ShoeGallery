import React from 'react';

class GalleryMenu extends React.Component {
    render() {

        return (
          <div className="galleryMenuContainer">
            <div className="galleryMenu">
                <p className="basket-wrapper" onClick={this.props.showBasketItems}>
                  <span className="basket-icon"><span className="items-qnt">{this.props.itemsQnt}</span></span>
                </p>
                <p onClick={()=>this.props.onMenuButtonClick(0)} className={`menu-item menu-item--men ${this.props.menuButtons[0]&& "active"}`}>MEN</p>
                <p onClick={()=>this.props.onMenuButtonClick(1)} className={`menu-item menu-item--women ${this.props.menuButtons[1]&& "active"}`}>WOMEN</p>
                <p onClick={()=>this.props.onMenuButtonClick(2)} className={`menu-item menu-item--kids ${this.props.menuButtons[2]&& "active"}`}>KIDS</p>
                <p onClick={()=>this.props.onMenuButtonClick(3)} className={`menu-item menu-item--sale ${this.props.menuButtons[3]&& "active"}`}>SALE</p>

                <input className="searchShoes-input" type="text" placeholder="Search" value={this.props.searchText} onChange={(e) => this.props.handleSearchText(e)}/>

                <div className="color-wrapper">
                    <p className="search-title">Color</p>
                    <div className="checkbox-wrapper">
                        <label>
                            <span>red</span>
                            <input className="checkbox-input" checked={this.props.checkColors[0]} type="checkbox" value="red" onChange={this.props.filterColor}/>
                        </label>
                        <label>
                            <span>black</span>
                            <input className="checkbox-input" checked={this.props.checkColors[1]} type="checkbox" value="black" onChange={this.props.filterColor}/>
                        </label>
                        <label>
                            <span>green</span>
                            <input className="checkbox-input" checked={this.props.checkColors[2]} type="checkbox" value="green" onChange={this.props.filterColor}/>
                        </label>
                        <label>
                            <span>blue</span>
                            <input className="checkbox-input" checked={this.props.checkColors[3]} type="checkbox" value="blue" onChange={this.props.filterColor}/>
                        </label>
                    </div>
                </div>
                <div className="price-wrapper">
                    <p className="search-title">Price</p>
                    <div className="checkbox-wrapper">
                        <label>
                            <span>price &uarr;</span>
                            <input className="checkbox-input" id="checkbox-red" checked={this.props.checkPrice[0]} type="checkbox" value="asc" onChange={this.props.sortPrice}/>
                        </label>
                        <label>
                            <span>price &darr;</span>
                            <input className="checkbox-input" checked={this.props.checkPrice[1]} type="checkbox" value="desc" onChange={this.props.sortPrice}/>
                        </label>
                    </div>
                </div>
            </div>
          </div>
        )
    }
}

export default GalleryMenu;
