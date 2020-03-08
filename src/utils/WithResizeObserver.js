import React, { Component } from 'react';

const supportResizeObserver = !!window.ResizeObserver;

export default function (ObservableComponent){
  return class extends Component {
    constructor (props){
      super(props);

      this.observableRef = React.createRef();
    }

    componentDidMount (){
      const observableDom = this.observableRef.current,
        handler = this.onObservableResize.bind(this);

      if (supportResizeObserver){
        this.resizeObserver = new ResizeObserver(handler);
        this.resizeObserver.observe(observableDom);
      } else {
        observableDom.contentWindow.addEventListener('resize', handler);
      }
    }

    onObservableResize (...rest){
      const { width, height } = this.observableRef.current.getBoundingClientRect();

      this.props.onResize({ width, height });
    }

    createIframe (ref){
      return (
        <iframe
          width="100%"
          height="100%"
          style={{ position: 'absolute', zIndex: -1, border: 'none' }}
          ref={ref}
        />
      );
    }

    render (){
      const props = { ...this.props },
        wrapperRef = supportResizeObserver ? { ref: this.observableRef } : {};

      delete props.onResize;

      return (
        <div {...wrapperRef} style={{ position: 'relative' }}>
          {supportResizeObserver ? null : this.createIframe(this.observableRef)}
          <ObservableComponent {...props} />
        </div>
      );
    }
  }
}
