// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router
  , Link
  , Route
  , withRouter
} from 'react-router-dom';

// import global components
import Base from '../../../global/components/BaseComponent.js.jsx';

// import landing page components
import LandingHero from '../components/LandingHero.js.jsx';
import LandingNav from '../components/LandingNav.js.jsx';

import landingStyles from '../landingStyles.css';

class Landing extends Base {
  constructor(props, context) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleScroll'
    )
  }

  componentDidMount() {
    window.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._handleScroll.bind(this));
  }

  _handleScroll(e) {
    // if the page is scrolled down, change the navbar style
    let scrollTop = e.target.scrollingElement.scrollTop;
    if(scrollTop > 50 && !this.state.isScrolled ) {
      this.setState({isScrolled: true});
    } else if(scrollTop < 50 && this.state.isScrolled) {
      this.setState({isScrolled: false});
    }
  }

  render() {
    return(
      <div className="master-layout">
        <LandingNav
          isScrolled={this.state.isScrolled}
          openDialog={this._openDialog}
        />
        <LandingHero />
        <div className="hero sub u-centerText">
          <p> Check out the docs on <a href="https://fugitivelabs.github.io/yote/"> GitHub </a></p>
        </div>
        <div styleName="tallboy"></div>
      </div>
    )
  }
}

Landing.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(Landing)
);
