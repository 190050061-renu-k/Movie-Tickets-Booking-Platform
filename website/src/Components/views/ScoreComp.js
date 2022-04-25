import Chart from "react-chartjs-2";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function getData(label, y_axis, points) {
  return {
    data: (canvas) => {
      return {
        labels: label,
        datasets: [
          {
            data: y_axis.bat1,
            type: "line",
            fill: false,
            borderColor: "#fbc658",
            backgroundColor: "transparent",
            pointBorderColor: "#fbc658",
            pointRadius: points.bat1,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            tension: 0,
          },
          {
            data: y_axis.bat2,
            type: "line",
            fill: false,
            borderColor: "#51CACF",
            backgroundColor: "transparent",
            pointBorderColor: "#51CACF",
            pointRadius: points.bat2,
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
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Runs",
          },
          ticks: {
            color: "#9f9f9f",
            beginAtZero: true,
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
            text: "Overs",
          },
          barPercentage: 1,
          grid: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            padding: 21,
            color: "#9f9f9f",
          },
        },
      },
    },
  };
}

function ScoreChart(props) {
  let scores = props.scores;
  let batting = props.batting;
  const labels = Array.from({ length: 21 }, (v, k) => k);
  const points = { bat1: [0], bat2: [0] };
  let obs = { bat1: [0], bat2: [0] };
  for (let s in scores) {
    if (scores[s].innings_no == "1") {
      obs.bat1.push(obs.bat1[obs.bat1.length - 1] + parseInt(scores[s].runs));
      if (scores[s].wickets != "0") points.bat1.push(2);
      else points.bat1.push(0);
    } else {
      obs.bat2.push(obs.bat2[obs.bat2.length - 1] + parseInt(scores[s].runs));
      if (scores[s].wickets != "0") points.bat2.push(2);
      else points.bat2.push(0);
    }
  }
  while (obs.bat1.length <= 20) {
    obs.bat1.push(obs.bat1[obs.bat1.length - 1]);
    points.bat1.push(0);
  }
  while (obs.bat2.length <= 20) {
    obs.bat2.push(obs.bat2[obs.bat2.length - 1]);
    points.bat2.push(0);
  }

  const stats = getData(labels, obs, points);
  const info = props.info;

  return (
    <>
      <br />
      <div className="content">
        <Row>
          <Col md="10" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Run Chart</CardTitle>
                <p className="card-category">Wickets Highlighted</p>
              </CardHeader>
              <CardBody>
                <Chart
                  data={stats.data}
                  options={stats.options}
                  width={800}
                  height={300}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-warning" /> {batting[0]}{" "}
                  <i className="fa fa-circle text-info" /> {batting[1]}
                </div>
                <br></br>
                <h5 className="text-center">
                  {info.win_type
                    ? info.match_winner +
                      " WON BY " +
                      info.win_margin +
                      " " +
                      info.win_type
                    : "Match Drawn"}
                </h5>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ScoreChart;
