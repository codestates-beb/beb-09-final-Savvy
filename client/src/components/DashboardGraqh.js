import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const data = [
  {
    id: 'Polygon',
    color: 'hsl(253, 70%, 50%)',
    data: [
      { x: '0:00', y: 78 },
      { x: '2:00', y: 267 },
      { x: '4:00', y: 95 },
      { x: '6:00', y: 197 },
      { x: '8:00', y: 217 },
      { x: '10:00', y: 127 },
      { x: '12:00', y: 296 },
      { x: '14:00', y: 191 },
      { x: '16:00', y: 265 },
      { x: '18:00', y: 232 },
      { x: '20:00', y: 151 },
      { x: '22:00', y: 20 },
    ],
  },
  {
    id: 'Solna',
    color: 'hsl(253, 70%, 50%)',
    data: [
      { x: '0:00', y: 85 },
      { x: '2:00', y: 276 },
      { x: '4:00', y: 297 },
      { x: '6:00', y: 256 },
      { x: '8:00', y: 230 },
      { x: '10:00', y: 148 },
      { x: '12:00', y: 307 },
      { x: '14:00', y: 200 },
      { x: '16:00', y: 271 },
      { x: '18:00', y: 239 },
      { x: '20:00', y: 153 },
      { x: '22:00', y: 181 },
    ],
  },
  {
    id: 'Klaytn',
    color: 'hsl(82, 70%, 50%)',
    data: [
      { x: '0:00', y: 90 },
      { x: '2:00', y: 300 },
      { x: '4:00', y: 110 },
      { x: '6:00', y: 210 },
      { x: '8:00', y: 240 },
      { x: '10:00', y: 380 },
      { x: '12:00', y: 310 },
      { x: '14:00', y: 210 },
      { x: '16:00', y: 280 },
      { x: '18:00', y: 250 },
      { x: '20:00', y: 160 },
      { x: '22:00', y: 202 },
    ],
  },
  {
    id: 'Ethereum',
    color: 'hsl(250, 70%, 50%)',
    data: [
      { x: '0:00', y: 95 },
      { x: '2:00', y: 300 },
      { x: '4:00', y: 115 },
      { x: '6:00', y: 215 },
      { x: '8:00', y: 245 },
      { x: '10:00', y: 155 },
      { x: '12:00', y: 315 },
      { x: '14:00', y: 220 },
      { x: '16:00', y: 285 },
      { x: '18:00', y: 260 },
      { x: '20:00', y: 165 },
      { x: '22:00', y: 397 },
    ],
  },
  {
    id: 'Bitcoin',
    color: 'hsl(9, 70%, 50%)',
    data: [
      { x: '0:00', y: 100 },
      { x: '2:00', y: 300 },
      { x: '4:00', y: 120 },
      { x: '6:00', y: 220 },
      { x: '8:00', y: 250 },
      { x: '10:00', y: 160 },
      { x: '12:00', y: 320 },
      { x: '14:00', y: 230 },
      { x: '16:00', y: 290 },
      { x: '18:00', y: 270 },
      { x: '20:00', y: 170 },
      { x: '22:00', y: 500 },
    ],
  },
];

const DashboardGraph = () => {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '200px',
        left: '290px',
        right: '35px',
        height: '550px',
        backgroundColor: 'white',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '20px',
        userSelect: 'none',
      }}
      onContextMenu={handleContextMenu}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontFamily: "'tektur', sans-serif",
          fontSize: '18px',
          fontWeight: '800',
          color: '#576ff6',
        }}
      >
        TBA increase/decrease
      </div>
      <ResponsiveLine
        data={data}
        margin={{ top: 80, bottom: 50, left: 50, right: 100 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 10,
          tickPadding: 7,
          tickRotation: 0,
          legend: 'Time',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'blue_purple' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default DashboardGraph;