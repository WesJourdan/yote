/**
 * Generic modal component. Uses ReactCSSTransitionGroup to animate entry (which
 * is configurable), and renders a modal header and modal body wrapped in a card
 * of a given size as passed in via props
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import third-party libraries
import classNames from 'classnames';

// import components
import Base from '../BaseComponent.js.jsx';

class Modal extends Base {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      isOpen
      , modalHeader
      , headerStyle
      , modalClasses
      , closeAction
      , confirmAction
      , btnColor
      , confirmText
      , closeText
      , cardSize
    } = this.props;

    const topClass = classNames(
      'topbar'
    )
    const confirmBtnClass = classNames(
      'yt-btn'
      , btnColor
    )

    const closeBtnClass = classNames(
      'yt-btn x-small u-pullRight'
      , modalClasses
    )

    const linkBtnClass = classNames(
      'yt-btn'
      , 'link'
      , btnColor
    )

    const modalClass = classNames(
      'standard-modal'
      , modalClasses
    )

    const colClass = classNames(
      'yt-col'
      , 'full'
      , {
        's_75 m_40 l_25 xl_20':  cardSize === 'small'
        , 's_75 m_50 l_33 xl_25': !cardSize || cardSize === 'standard'
        , 's_75  l_50': cardSize === 'large'
        , 's_80': cardSize === 'jumbo'
      }
    )

    /**
     * This conditional tells the HTML <body> that there is a modal open, so we
     * should prevent scrolling
     */
    if(isOpen) {
      document.body.classList.toggle('modal-open', true);
    } else {
      document.body.classList.toggle('modal-open', false);
    }

    if(isOpen) {
      // render the modal
      return (
        <ReactCSSTransitionGroup
          transitionName="modal-anim"
          transitionAppear={true}
          transitionLeave={true}
          transitionEnter={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={350}
        >
          <div className={modalClass}>
            <div className={colClass}>
              <div className="card">
                <div className="card-header" style={headerStyle}>
                  {modalHeader}
                  <button className={closeBtnClass} onClick={()=>closeAction()}>
                    <i className="ion ion-close-round" />
                  </button>
                </div>
                <div className="card-body">
                  {this.props.children}
                </div>
                <div className="card-footer">
                  <div className="yt-row space-between">
                    <button className={linkBtnClass} onClick={()=> closeAction()}>{closeText}</button>
                    { confirmAction ?
                      <button className={confirmBtnClass} onClick={()=> confirmAction()}>{confirmText}</button>
                      :
                      <div/>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      )
    } else {
      // stop rendering the modal, but try to animate out
      return (
        <ReactCSSTransitionGroup
          transitionName="modal-anim"
          transitionAppear={true}
          transitionLeave={true}
          transitionEnter={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={350}
        />
      )
    }
  }
}

Modal.propTypes = {
  btnColor: PropTypes.string
  , cardSize: PropTypes.oneOf(['small', 'standard', 'large', 'jumbo'])
  , closeAction: PropTypes.func.isRequired
  , closeText: PropTypes.string
  , confirmAction: PropTypes.func
  , confirmText: PropTypes.string
  , headerStyle: PropTypes.any
  , isOpen: PropTypes.bool.isRequired
  , modalHeader: PropTypes.any
  , modalClasses: PropTypes.string
}

Modal.defaultProps = {
  btnColor: 'info'
  , cardSize: 'standard'
  , closeText: 'Close'
  , confirmAction: null
  , headerStyle: null
  , modalHeader: null
  , modalClasses: ''
}

export default Modal;
