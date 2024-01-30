import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const OrgChart = () => {
  const chartOptions = {
    chart: {
      height: 600,
      inverted: true,
    },
    title: {
      text: 'Organizational Chart',
    },
    series: [
      {
        type: 'organization',
        name: 'Highsoft',
        keys: ['from', 'to'],
        data: [
          ['Grand CEO', 'VP Product'],
          ['VP Product', 'Product Manager'],
          ['VP Product', 'Product Designer'],
          ['Grand CEO', 'VP Sales'],
          ['VP Sales', 'Sales Manager'],
          ['VP Sales', 'Sales Representative'],
        ],
        levels: [
          {
            level: 0,
            color: 'silver',
            dataLabels: {
              color: 'black',
            },
          },
          {
            level: 1,
            color: 'silver',
            dataLabels: {
              color: 'black',
            },
          },
          {
            level: 2,
            color: '#980104',
          },
          {
            level: 4,
            color: '#359154',
          },
        ],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default OrgChart;
