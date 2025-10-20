document.getElementById('csvFile').addEventListener('change', function(e) {
  // Get the uploaded file
  const file = e.target.files[0];
  
  // Use PapaParse to parse the CSV file
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

      // Create the line chart using Chart.js
      createLineChart(labels, data);
    },
    header: false,  // Assuming no headers in the CSV
    skipEmptyLines: true
  });
});

// Function to create the line chart
function createLineChart(labels, data) {
  // config
  const ctx = document.getElementById('lineChart').getContext('2d');
  // setup
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Values',
        data: data,  // Y-axis data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Timestamp'
          },
        },
        y: {
          title: {
            display: true,
            text: 'Value'
          },
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Values over Time'
        }
      }
    }
  });
}
