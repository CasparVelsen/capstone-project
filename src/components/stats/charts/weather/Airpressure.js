import { Line } from 'react-chartjs-2';
import lodash from 'lodash';
import { Chart as ChartJS } from 'chart.js/auto';

function Airpressure({ filteredCardsByWater }) {
  const findAirpressure = filteredCardsByWater.map(card => card.airpressure);
  const filteredAirpressure = [...new Set(findAirpressure)];
  filteredAirpressure.sort();

  const airpressureArray = filteredAirpressure.map((data, index) => {
    const filterForAirpressure = filteredCardsByWater.filter(
      card => card.airpressure === data
    );
    const catches = filterForAirpressure.map(data => data.catches.length);
    var numberCatches = lodash.sum(catches);
    const obj = { id: index, airpressure: data, catches: numberCatches };
    return obj;
  });

  const airpressure = {
    labels: airpressureArray.map(data => data.airpressure),
    datasets: [
      {
        label: 'catches',
        data: airpressureArray.map(data => data.catches),
        fill: true,
        backgroundColor: 'rgba(162, 195, 108, 0.5)',
        borderColor: '#687a48',
        borderWidth: 1.5,
        tension: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Catches / ',
        align: 'start',
        color: '#687a48',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={airpressure} options={options} />;
}

export default Airpressure;
