import React from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
Chart.register(ChartDataLabels);

function getData(label, y_axis) {
  return {
    data: (canvas) => {
      return {
        labels: label,
        datasets: [
          {
            label: "Venue Statistics",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468"],
            borderWidth: 0,
            data: y_axis,
          },
        ],
      };
    },
    options: {
      plugins: {
        datalabels: {
          formatter: (val, ctx) => {
            const totalDatasetSum = ctx.chart.data.datasets[
              ctx.datasetIndex
            ].data.reduce((a, b) => parseInt(a) + parseInt(b), 0);

            const percentage = (val * 100) / totalDatasetSum;
            const roundedPercentage = Math.round(percentage * 100) / 100;
            return roundedPercentage != 0 ? roundedPercentage + "%" : "";
          },
        },
      },

      maintainAspectRatio: false,
    },
  };
}

const VenuePie = (props) => {
  const differentWins = props.differentWins;
  const obs = [
    differentWins.batting_first,
    differentWins.batting_sec,
    differentWins.drawn,
  ];
  const labels = ["Team batting 1st won", "Team batting 2nd won", "Draw"];

  const stats = getData(labels, obs);

  if (
    differentWins.batting_first == 0 &&
    differentWins.batting_sec == 0 &&
    differentWins.drawn == 0
  )
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Outline of matches</CardTitle>
        </CardHeader>
        <CardBody>No matches played!</CardBody>
      </Card>
    );
  else
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Outline of matches</CardTitle>
        </CardHeader>
        <CardBody style={{ height: "266px" }}>
          <Doughnut
            width={1000}
            height={400}
            data={stats.data}
            options={stats.options}
          />
        </CardBody>
      </Card>
    );
};

export default VenuePie;
