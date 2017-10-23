/**
 * Generic product list view. Defaults to 'all' with:
 * this.props.dispatch(productActions.fetchListIfNeeded());
 *
 * NOTE: More list examples are:
 * this.props.dispatch(productActions.fetchListIfNeeded("all"));
 * this.props.dispatch(productActions.fetchListIfNeeded()).then((data) => {
 *   console.log("DATA", data);
 * });
 * this.props.dispatch(productActions.fetchListIfNeeded("_workout"));
 * this.props.dispatch(productActions.fetchListIfNeeded("_section", "1234"));
 * this.props.dispatch(productActions.fetchList("_section", "3456", "78910")).then(() => {
 *   this.props.dispatch(productActions.invalidateList("_section", "3456", "78910"));
 * });
 * this.props.dispatch(productActions.setFilter({test: 2}));
 * this.props.dispatch(productActions.setFilter({test: 2}, "_section", "1234"));
 * this.props.dispatch(productActions.setPagination({test: 1}, "_section", "1234"));
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
import * as productActions from '../productActions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import product components
import ProductListItem from './ProductListItem.js.jsx';

// import product css modules
import productStyles from '../productModuleStyles.css';

class ProductList extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch a list of your choice
    this.props.dispatch(productActions.fetchListIfNeeded()); // defaults to 'all'
  }

  render() {
    const { productList, productMap } = this.props;

    /**
     * NOTE: Regarding isEmpty, when the app loads, all "product lists"
     * are null objects. Lists exist in memory and only after we deliberately
     * create them.
     */
    const isEmpty = !productList || !productList.items || productList.items.length === 0 || productList.didInvalidate;

    return (
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h1> Product List
              <Link className="yt-btn small u-pullRight" to={'/products/new'}> NEW PRODUCT </Link>
            </h1>
            <hr/>
            { isEmpty ?
              (productList && productList.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              :
              <div style={{ opacity: productList.isFetching ? 0.5 : 1 }}>
                <ul styleName="product-list">
                  {productList.items.map((id, i) =>
                    <ProductListItem key={id} product={productMap[id]} />
                  )}
                </ul>
              </div>
            }
          </div>
        </section>
      </div>
    )
  }
}

ProductList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    productList: store.product.lists.all
    , productMap: store.product.byId
  }
}

export default connect(
  mapStoreToProps
)(ProductList);
