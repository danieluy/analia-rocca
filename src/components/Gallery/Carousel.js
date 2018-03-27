import React from 'react';
import PropTypes from 'prop-types';
import PhotoSwipe from 'photoswipe';
import photoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.init = this.init.bind(this);
  }
  init() {
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const items = this.props.photos;
    const options = { index: this.props.index };
    const gallery = new PhotoSwipe(pswpElement, photoSwipeUIDefault, items, options);
    gallery.listen('close', () => {
      gallery.destroy();
      this.props.onClose();
    });
    gallery.init();
  }
  render() {
    return (
      <div className="gallery">
        <h1>Gallery</h1>
        {/* Root element of PhotoSwipe. Must have class pswp. */}
        <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true" ref={this.init}>

          {/* Background of PhotoSwipe.
               It's a separate element as animating opacity is faster than rgba(). */}
          <div className="pswp__bg" />

          {/* Slides wrapper with overflow:hidden. */}
          <div className="pswp__scroll-wrap">

            {/* Container that holds slides. */}
            {/* PhotoSwipe keeps only 3 of them in the DOM to save memory. */}
            {/* Don't modify these 3 pswp__item elements, data is added later on. */}
            <div className="pswp__container">
              <div className="pswp__item" />
              <div className="pswp__item" />
              <div className="pswp__item" />
            </div>

            {/* Default (PhotoSwipeUIDefault) interface on top of sliding area. Can be changed. */}
            <div className="pswp__ui pswp__ui--hidden">

              <div className="pswp__top-bar">

                {/* Controls are self-explanatory. Order can be changed. */}

                <div className="pswp__counter" />

                <button className="pswp__button pswp__button--close" title="Close (Esc)" />

                <button className="pswp__button pswp__button--share" title="Share" />

                <button className="pswp__button pswp__button--fs" title="Toggle fullscreen" />

                <button className="pswp__button pswp__button--zoom" title="Zoom in/out" />

                {/* Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR */}
                {/* element will get class pswp__preloader--active when preloader is running */}
                <div className="pswp__preloader">
                  <div className="pswp__preloader__icn">
                    <div className="pswp__preloader__cut">
                      <div className="pswp__preloader__donut" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div className="pswp__share-tooltip" />
              </div>

              <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" />

              <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)" />

              <div className="pswp__caption">
                <div className="pswp__caption__center" />
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    w: PropTypes.number,
    h: PropTypes.number
  })).isRequired,
  onClose: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
