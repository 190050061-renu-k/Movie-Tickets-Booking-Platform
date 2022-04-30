import Chart from "react-chartjs-2";
import React from "react";

function getData(label, bar_data, line_data, linelabel, barlabel) {
  return {
    data: (canvas) => {
      return {
        labels: label,
        datasets: [
          {
            data: line_data,
            type: "line",
            label: "line",
            yAxisID: "line",
            fill: false,
            borderColor: "#fbc658",
            backgroundColor: "transparent",
            pointBorderColor: "#fbc658",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            tension: 0,
          },
          {
            data: bar_data,
            type: "bar",
            label: "bar",
            yAxisID: "bar",
            fill: false,
            borderColor: "#51CACF",
            backgroundColor: "#51CACF",
            pointBorderColor: "#51CACF",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            barPercentage: 0.5,
          },
        ],
      };
    },

    options: {
      plugins: {
        legend: { display: false },
      },
      scales: {
        line: {
          beginAtZero: true,
          position: "left",
          title: {
            display: true,
            text: linelabel,
          },
        },
        bar: {
          beginAtZero: true,
          position: "right",

          grid: {
            drawBorder: false,
            display: false,
          },
          title: {
            display: true,
            text: barlabel,
          },
        },
        x: {
          beginAtZero: false,

          title: {
            display: true,
            text: "Match ID",
          },
          grid: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            padding: 2,
            categoryPercentage: 1.0,
            barPercentage: 0.5,
            callback: function (label) {
              return `${this.getLabelForValue(label)}`;
            },
          },
          // ticks: {
          //   padding: 1,
          //   color: "#9f9f9f",
          // },
        },
      },
    },
  };
}

function MixedChart(props) {
  let bowlingChart = props.bowlingChart;
  let stats = { match_ids: [], runs_given: [], wickets: [] };
  for (let x in bowlingChart) {
    stats.match_ids.push(bowlingChart[x].match_id);
    stats.runs_given.push(bowlingChart[x].runs_given);
    stats.wickets.push(bowlingChart[x].wickets);
  }

  const result = getData(
    stats.match_ids,
    stats.runs_given,
    stats.wickets,
    props.linelabel,
    props.barlabel
  );

  return (
    <>
      <br />
      <div className="content">
        <Chart
          data={result.data}
          options={result.options}
          width={1000}
          height={400}
        />
        <div className="chart-legend">
          <i className="fa fa-circle text-warning" /> Wickets{" "}
          <i className="fa fa-circle text-info" /> Runs conceded
        </div>
      </div>
    </>
  );
}

export default MixedChart;
