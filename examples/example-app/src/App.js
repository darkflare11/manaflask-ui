import React, { Component } from 'react';
import './App.css';

import { Grid } from './packages/manaflask-ui/index';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateData (){
  const result = [];

  for (let i = 0; i < 100; i++){
    result.push({
      column1: getRandomInt(1000),
      column2: getRandomInt(1000),
      column3: getRandomInt(10000)
    });
  }

  return result;
}

const columns = [{
    text: 'Column 1', fieldName: 'column1', resizible: true
  },{
    text: 'Column 2', fieldName: 'column2', resizible: true
  },{
    text: 'Column 3', fieldName: 'column3', resizible: true
  }],
  data = generateData();

export default class App extends Component {
  render (){
    return (
      <div className="grid-container">
        <Grid
          columns={columns}
          data={data}
          stripeRows={true}
        />
      </div>
    );
  }
}
