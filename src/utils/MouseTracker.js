import React, { Component } from 'react';

export default class MouseTracker extends Component {
  constructor (props){
    super(props);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount (){
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount (){
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove (e){
    this.props.onMouseMove(e);
  }

  onMouseUp (){
    this.props.onMouseUp();
  }

  render (){
    return (
      null
    );
  }
}
