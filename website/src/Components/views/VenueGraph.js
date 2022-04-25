import Chart from "react-chartjs-2";
import React from "react";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";

function getData(label, y_axis) {
  return {
    data: (canvas) => {
      return {
        labels: label,
        datasets: [
          {
            data: y_axis,
            type: "line",
            fill: false,
            borderColor: "#fbc658",
            backgroundColor: "transparent",
            pointBorderColor: "#fbc658",
            pointRadius: 2,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            tension: 0,
          },
        ],
      };
    },
    options: {
      plugins: {
        datalabels: { color: "transparent" },
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Runs",
          },
          ticks: {
            color: "#9f9f9f",
            beginAtZero: false,
            maxTicksLimit: 8,
          },
          grid: {
            drawBorder: false,
            display: true,
          },
        },
        x: {
          title: {
            display: true,
            text: "Year",
          },
          grid: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            padding: 21,
            color: "#9f9f9f",
            callback: function (label) {
              return `${this.getLabelForValue(label)}`;
            },
          },
        },
      },
    },
  };
}

function VenueGraph(props) {
  let averageScore = props.averageScore;
  let years = ["2011", "2013", "2015", "2017"];
  let obs = { 2011: 0, 2013: 0, 2015: 0, 2017: 0 };
  for (let s in averageScore) {
    obs[averageScore[s].season_year] = averageScore[s].round;
  }
  let y_axis = Object.values(obs);
  const stats = getData(years, y_axis);

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h5">Average First Innings Score</CardTitle>
        </CardHeader>
        <CardBody>
          <Chart
            data={stats.data}
            options={stats.options}
            width={1000}
            height={430}
          />
        </CardBody>
      </Card>
    </>
  );
}

export default VenueGraph;
