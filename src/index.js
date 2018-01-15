import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Slider  from 'react-slick';
import App from './containers/App';
import Product from './containers/Product';
import NewProduct from './containers/NewProduct.js';
import SearchCard from './components/SearchCard.js';
import CategoryList from './components/CategoryList.js';
import CategoryInMobile from './components/CategoryInMobile.js';
import reducers from './reducers';
import MediaQuery from 'react-responsive';

const settings = {
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    };

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <Router>
      <div>
        <div style={{ marginBottom: 50 }}>
        <Slider {...settings} style={{ width: window.innerWidth }}>
          <div className="background1 background"></div>
          <div className="background2 background"></div>
          <div className="background3 background"></div>
          <div className="background4 background"></div>
        </Slider>
        </div>
        <MediaQuery query="(min-device-width: 767px)">
        <MediaQuery query="(min-width: 767px)">
          <div style={{ flexDirection: 'row', display: 'flex' }}>
          <div style={{ width: 300, paddingHorizontal: 5, borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderTop: '1px solid #ddd'}}>
            <div style={{height: 50, width: 300, display: 'flex', borderBottom: '1px solid #ddd', alignItems: 'center' }}>
                <h5 style={{ fontSize: 16, fontWeight: 'bold' }}>Filters</h5>
            </div>
            <CategoryList />
          </div>
          <div style={{ flex: 1, borderBottom: '1px solid #ddd', borderTop: '1px solid #ddd' }}>
            <SearchCard />
          <Switch>
          <Route path="/product/new" component={NewProduct} />
          <Route path="/product/:id" component={Product} />
          <Route path="/" component={App} />
          </Switch>
          </div>
          </div>
        </MediaQuery>
        <MediaQuery query="(max-width: 766px)">
          <div>
          <CategoryInMobile />
          <Switch>
          <Route path="/product/new" component={NewProduct} />
          <Route path="/product/:id" component={Product} />
          <Route path="/" component={App} />
          </Switch>
          </div>
        </MediaQuery>

        </MediaQuery>
        <MediaQuery query="(max-device-width: 767px)">
        <div>
        <CategoryInMobile />
        <Switch>
          <Route path="/product/new" component={NewProduct} />
          <Route path="/product/:id" component={Product} />
          <Route path="/" component={App} />
        </Switch>
        </div>
        </MediaQuery>
      </div>
  </Router>
  </Provider>
  , document.querySelector('.contain'));
