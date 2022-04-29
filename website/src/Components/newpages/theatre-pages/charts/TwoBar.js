export function TwoBar(label, yaxis1, yaxis2, name, label1, label2) {
    return {
      data: (canvas) => {
        return {
          labels: label,
          datasets: [
            {
                data: yaxis1,
                backgroundColor: "#b89a5a",
                label: label1,
                
            },
            {
                data: yaxis2,
                backgroundColor: "#779dd9",
                label:label2,
                
            },
          ],
        };
      },
      options: {
        barValueSpacing: 20 ,
        plugins: {
          datalabels: { color: "black" },
          legend: {
            display: true,
           
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


  export function OneBar(label, yaxis, name, color) {
    return {
      data: (canvas) => {
        return {
          labels: label,
          datasets: [
            {
                data: yaxis,
                backgroundColor: color,
                
            },
            
          ],
        };
      },
      options: {
        barValueSpacing: 20 ,
        plugins: {
          datalabels: { color: "black" },
          legend: {
            display: false,
           
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