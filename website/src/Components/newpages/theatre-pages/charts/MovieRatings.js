import React from "react"
import {  Card, CardBody, CardTitle } from "reactstrap";
import Chart from "react-chartjs-2";

function getData(label, yaxis, xaxis) {
    return {
      type:"line",
      data: (canvas) => {
        return {
          labels: label,
          datasets: [
            {
                data: yaxis,
                fill: false,
                type:"line",
                borderColor: "#e81710",
                backgroundColor: "transparent",
                borderWidth: 1,
                pointStyle: 'rectRot',
                pointRadius: 5,
                pointBorderColor: 'rgb(0, 0, 0)'
              },
          ],
        };
      },
      options: {
        plugins: {
          datalabels: { color: "transparent" },
          legend: {
            display: false,
            labels: {
              usePointStyle: true,
            },
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Ratings",
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
        },
      },
    };
  }

const LineChart = () => {
    var yaxis = [10,1,5];
    var xaxis  = ["Theatre 1", "Theatre 2", "Theatre 3"];
    var stats = getData(xaxis, yaxis,xaxis);
	return (
		<div className="row container" style={{margin:"20px"}}>
			<Card className="card-chart">
                <CardTitle tag="h5">View Ratings of Theatres</CardTitle>
                <CardBody>
                    <Chart
                    data={stats.data}
                    options={stats.options}
                    width={800}
                    height={300}
                    />
                </CardBody>
            </Card>
		</div>
	)
}

export default LineChart
