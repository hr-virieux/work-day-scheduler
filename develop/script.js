$(function () {
  // Display the current date at the top of the calendar
  const displayCurrentDate = () => {
    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
  };

  // Function to create a time block row for each hour
  const createTimeBlockRow = (hour) => {
    // Get the current hour in 24-hour format for comparison
    const currentHour24 = dayjs().hour();
    console.log('Current hour: ' + currentHour24); // Log current hour for debugging

    // Determine whether the hour is in the past, present, or future
    let timeClass;
    if (hour < currentHour24) {
      timeClass = 'past';
    } else if (hour === currentHour24) {
      timeClass = 'present';
    } else {
      timeClass = 'future';
    }
    console.log(`Creating row for hour ${hour} with class ${timeClass}`); // Log class assignment for debugging

    // Create the time block row elements
    const timeBlockRow = $('<div>').addClass(`row time-block ${timeClass}`).attr('id', `hour-${hour}`);
    const hourDisplay = hour > 12 ? hour - 12 : hour; // Convert to 12-hour format for display
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const hourCol = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(`${hourDisplay}${amPm}`);
    const textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
    const button = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save"></i>');

    // Load any saved data from localStorage
    const savedEvent = localStorage.getItem(`hour-${hour}`);
    if (savedEvent) {
      textArea.val(savedEvent);
    }

    // Append the elements to the time block row
    timeBlockRow.append(hourCol, textArea, button);

    // Append the row to the container on the page
    $('.container-lg').append(timeBlockRow);
  };

  // Event listener for the save buttons
  const handleSaveButtonClick = () => {
    $('.container-lg').on('click', '.saveBtn', function () {
      const hourId = $(this).parent().attr('id');
      const eventText = $(this).siblings('.description').val();
      localStorage.setItem(hourId, eventText);
    });
  };

  // Initialize the scheduler by creating time blocks and enabling save functionality
  const initScheduler = () => {
    displayCurrentDate();
    // Clear any existing rows before creating new ones
    $('.container-lg').empty();
    for (let hour = 9; hour <= 17; hour++) {
      createTimeBlockRow(hour);
    }
    handleSaveButtonClick();
  };

  // Call the function to initialize the scheduler
  initScheduler();
  });
