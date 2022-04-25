import React from "react";
import { Pie } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";

function getData(label, y_axis) {
  return {
    data: (canvas) => {
      return {
        labels: label,
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              "#e3e3e3",
              "#4acccd",
              "#fcc468",
              "#ef8157",
              "#ab965e",
              "#9d78b3",
              "#5d62f0",
            ],
            borderWidth: 0,
            data: y_axis,
          },
        ],
      };
    },
    options: {
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
      maintainAspectRatio: false,
      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 2,
      },
      scales: {
        y: {
          ticks: {
            display: false,
          },
          grid: {
            drawBorder: false,
            display: false,
          },
        },
        x: {
          barPercentage: 1.6,
          grid: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  };
}

const PieChart = (props) => {
  const runsSummary = props.runsSummary;
  const batting = props.batting;
  const inn_no = props.inn_no;

  const labels = [];
  let obs = [];
  for (let s in runsSummary) {
    if (runsSummary[s].innings_no == inn_no) {
      if (runsSummary[s].run_type == "7") {
        labels.push("extras");
      } else {
        labels.push(runsSummary[s].run_type + "'s");
      }

      obs.push(runsSummary[s].runs);
    }
  }

  const stats = getData(labels, obs);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5">Runs Statistics</CardTitle>
        <p className="card-category">{batting}</p>
      </CardHeader>
      <CardBody style={{ height: "266px" }}>
        <Pie data={stats.data} options={stats.options} />
      </CardBody>
    </Card>
  );
};

export default PieChart;
