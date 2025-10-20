document.getElementById('csvFile').addEventListener('change', function(e) {
  const file = e.target.files[0];
  
  Papa.parse(file, {
    complete: function(results) {
      console.log('Parsed CSV Data:', results.data);

      const labels = [];
      const data = [];

      // Parse the CSV rows into labels and data arrays
      results.data.forEach(row => {
        if (row[0] && row[1]) {
          labels.push(row[0]);  // Date or X-axis data
          data.push(parseFloat(row[1]));  // Value or Y-axis data
        }
      });
      createBarChart(labels, data);
    },
    header: false,  
    skipEmptyLines: true
  });
});

function createBarChart(labels, data) {
  // config
  const ctx = document.getElementById('barChart').getContext('2d');
  // setup
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Values',
        data: data,
        borderColor: [
          'rgba(139, 39, 245, 1)'
        ],
        backgroundColor: [
          'rgba(139, 39, 245, 0.5)'
        ],
        fill: false,
      }]
    },
    options: {
      responsive: true,
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2
        }
      },
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Value'
          },
        },
        y: {
          title: {
            display: true,
            text: 'Timestamp'
          },
        }
      },
      plugins: {
        legend: {
          position: 'right'
        },
      title: {
        display: true,
        text: 'Values over Time'
      }
      }
    }
  })
}