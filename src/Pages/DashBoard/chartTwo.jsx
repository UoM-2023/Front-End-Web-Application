import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
import { BarChart } from '@mui/x-charts';
import './chartTwo.css';

export default function ChartTwo() {
  const colors = ['#d47a12', '#0a0a0a', '#db4b12', '#50504e']; // to change the colors ofthe chart

  return (
    <div className="chartTwo">
      <BarChart
        series={[
          { data: [35, 44, 24, 34], color: colors[0] },
          { data: [51, 6, 49, 30], color: colors[1] },
          { data: [15, 25, 30, 50], color: colors[2] },
          { data: [80, 50, 15, 25], color: colors[3] },
        ]}
        height={200}
        width={700}
        xAxis={[{ data: ['Wing 01', 'Wing 02', 'Wing 03', 'Wing 04'], scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </div>
  );
}




