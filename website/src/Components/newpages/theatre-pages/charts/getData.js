export function getData(label, yaxis, name) {
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
              text: name,
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