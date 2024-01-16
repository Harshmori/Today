
  document.addEventListener('DOMContentLoaded', function () {
      // Function to save data to Chrome storage
      function saveData(data) {
          chrome.storage.sync.set({ 'todoData': data }, function () {
              console.log('Data saved:', data);
          });
      }
  
      // Function to load data from Chrome storage
      function loadData(callback) {
          chrome.storage.sync.get('todoData', function (result) {
              console.log('Data loaded:', result.todoData);
              callback(result.todoData || []);
          });
      }
  
      // Function to render the schedule from the loaded data
      function renderSchedule(data) {
          // Iterate through data and set values to the input fields
          data.forEach(function (item, index) {
              const inputField = document.querySelectorAll('.bg-gray-700.text-white.w-full')[index];
              if (inputField) {
                  inputField.value = item.task;
              }
          });
      }
  
       // Function to update and display the current datetime
       function updateDatetime() {
          const datetimeElement = document.getElementById('datetime');
          if (datetimeElement) {
              const now = new Date();
              const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
              const formattedDatetime = now.toLocaleString('en-US', options);
              datetimeElement.textContent = formattedDatetime;
          }
      }
  
      // Function to update and display the current date in "dd/mm/yyyy" format
      function updateDate() {
          const dateElement = document.getElementById('date');
          if (dateElement) {
              const now = new Date();
              const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
              const formattedDate = now.toLocaleString('en-GB', options);
              dateElement.textContent = formattedDate;
          }
      }
  
      // Load data when the page is loaded
      loadData(renderSchedule);
  
      // Update the datetime every second (1000 milliseconds)
      setInterval(function () {
          updateDatetime();
          updateDate();
      }, 1000);
  
  
      // Event listener for the Enter key to save data
      document.addEventListener('keydown', function (event) {
          if (event.key === 'Enter') {
              // Collect data from your input fields and structure it as needed
              const todoData = [];
  
              // Iterate through time slots and collect data
              const inputFields = document.querySelectorAll('.bg-gray-700.text-white.w-full');
              inputFields.forEach(function (inputField) {
                  todoData.push({ time: inputField.previousElementSibling.textContent, task: inputField.value });
              });
  
              // Save the data
              saveData(todoData);
          }
      });
  
      // Function to clear all data
      function clearData() {
          chrome.storage.sync.clear(function () {
              console.log('Data cleared');
          });
  
          // Clear input fields
          const inputFields = document.querySelectorAll('.bg-gray-700.text-white.w-full');
          inputFields.forEach(function (inputField) {
              inputField.value = '';
          });
      }
  
      // Event listener for the "Clear Everything" button
      const clearButton = document.querySelector('button'); // You might need to adjust this selector based on your actual HTML structure
      if (clearButton) {
          clearButton.addEventListener('click', clearData);
      }
  });
  

  // Function to calculate the day of the year
function getDayOfYear(date) {
    // Check if the input is a valid Date object
    if (!(date instanceof Date) || isNaN(date)) {
      return "Invalid date!";
    }
  
    // Get the current date
    const currentDate = new Date(date);
  
    // Get the start of the year
    const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
  
    // Calculate the difference in milliseconds
    const diffMilliseconds = currentDate - startOfYear;
  
    // Calculate the number of days
    const dayOfYear = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));
  
    return dayOfYear;
  }
  
  function generatePattern(rows, cols, containerId) {
    const today = new Date();
    const dayOfYear = getDayOfYear(today);

    document.getElementById(containerId).title = `Day of The Year: ${dayOfYear}`;


    for (let i = 0; i < rows; i++) {
        const container = document.createElement('div');
        container.classList.add('flex', 'gap-1', 'p-1');

        const totalCols = (i === rows - 1) ? 65 : cols; // Set the number of columns for the last row

        for (let j = 0; j < totalCols; j++) {
            const box = document.createElement('div');
            box.classList.add('h-3', 'w-4', 'rounded');

            const cumulativeDay = i * cols + j + 1;
            


            if (cumulativeDay <= dayOfYear && cumulativeDay <= rows * cols) {
                box.classList.add('bg-green-500');
            } else {
                box.classList.add('bg-gray-200');
            }

            container.appendChild(box);
        }

        if (i === rows - 1) {
            // Add blank space after the first 65 boxes in the last row
            const remainingSpace = cols - 65;
            for (let k = 0; k < remainingSpace; k++) {
                const blankBox = document.createElement('div');
                blankBox.classList.add('h-4', 'w-4', 'bg-transparent');
                container.appendChild(blankBox);
            }
        }

        document.getElementById(containerId).appendChild(container);
    }
}

// Adjust rows, cols, and containerId based on your new requirements
generatePattern(4, 100, 'patternContainer');

//   function generatePattern(rows, cols, containerId) {
//       const today = new Date();
//       const dayOfYear = getDayOfYear(today);
  
//       for (let i = 0; i < rows; i++) {
//           const container = document.createElement('div');
//           container.classList.add('flex', 'gap-1', 'p-1');
  
//           for (let j = 0; j < cols; j++) {
//               const box = document.createElement('div');
//               box.classList.add('h-4', 'w-4', 'rounded');
  
//               // Color boxes based on whether they represent a day before or equal to today
//               const totalDays = rows * cols;

// if (i * cols + j + 1 <= dayOfYear && i * cols + j + 1 <= totalDays) {
//     box.classList.add('bg-green-500');
// } else {
//     box.classList.add('bg-gray-200');
// }

  
//               container.appendChild(box);
//           }
  
//           // Attach the generated pattern to the specified container
//           document.getElementById(containerId).appendChild(container);
//       }
//   }
  
//   // Adjust rows, cols, and containerId based on your requirements
//   generatePattern(5, 73, 'patternContainer');
  