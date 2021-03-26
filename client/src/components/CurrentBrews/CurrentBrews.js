import React from 'react';
// import { HorizontalBar } from 'react-chartjs-2';

const state = {
    labels: ['Brew 1', 'Brew 2', 'Brew 3'],
    datasets: [
      {
        label: 'Days Since Started',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [23, 7, 1]
      }
    ]
}

export default class CurrentBrews extends React.Component {
  render() {
    return (
        <div>
            <h2>CurrentBrews</h2>
            {/* <HorizontalBar data={state} /> */}
        </div>
    );
  }
}