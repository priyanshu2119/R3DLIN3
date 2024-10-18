document.addEventListener("DOMContentLoaded", () => {
    const mentors = [
        { name: "Dr. Jane Smith", subject: "Computer Science", availability: ["2024-10-19T10:00", "2024-10-19T14:00"], photo: "mentor/tanish.jpg" },
        { name: "Prof. John Doe", subject: "Mechanical Engineering", availability: ["2024-10-19T12:00", "2024-10-19T15:00"], photo: "mentor/tanish.jpg" },
        { name: "Dr. Emily Johnson", subject: "Electrical Engineering", availability: ["2024-10-19T11:00", "2024-10-19T13:00"], photo: "mentor/tanish.jpg" },
        { name: "Dr. Emily Johnson", subject: "Electrical Engineering", availability: ["2024-10-19T11:00", "2024-10-19T13:00"], photo: "mentor/tanish.jpg" },
        { name: "Dr. Emily Johnson", subject: "Electrical Engineering", availability: ["2024-10-19T11:00", "2024-10-19T13:00"], photo: "mentor/tanish.jpg" }
    ];

    const mentorList = document.getElementById('mentor-list');
    const mentorSelect = document.getElementById('mentor');
    const bookingMessage = document.getElementById('booking-message');
    const modal = document.getElementById('modal');
    const studentDetailsForm = document.getElementById('student-details-form');
    const studentNameInput = document.getElementById('student-name');
    const studentEmailInput = document.getElementById('student-email');

    let selectedMentor = '';
    let selectedDateTime = '';

    mentors.forEach(mentor => {
        const mentorCard = document.createElement('div');
        mentorCard.classList.add('mentor-card');
        
        mentorCard.innerHTML = `
            <div class="mentor-info">
                <h3>${mentor.name}</h3>
                <p><strong>Subject:</strong> ${mentor.subject}</p>
                <p><strong>Available Times:</strong></p>
                <ul>
                    ${mentor.availability.map(time => `
                        <li class="time-slot" data-mentor="${mentor.name}" data-time="${time}">
                            ${new Date(time).toLocaleString()}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <img src="${mentor.photo}" alt="${mentor.name}'s Photo" class="mentor-photo">
        `;
        
        mentorList.appendChild(mentorCard);

        const option = document.createElement('option');
        option.value = mentor.name;
        option.textContent = mentor.name;
        mentorSelect.appendChild(option);
    });

    // Handle clicking on time slots
    mentorList.addEventListener('click', (event) => {
        if (event.target.classList.contains('time-slot')) {
            selectedMentor = event.target.getAttribute('data-mentor');
            selectedDateTime = event.target.getAttribute('data-time');

            // Open the modal
            modal.style.display = "block";
            bookingMessage.textContent = `You selected ${selectedMentor} at ${new Date(selectedDateTime).toLocaleString()}.`;
            bookingMessage.style.color = 'blue';
        }
    });

    // Modal close functionality
    const closeModal = document.querySelector('.close');
    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    // Handle student details form submission
    studentDetailsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const studentName = studentNameInput.value;
        const studentEmail = studentEmailInput.value;

        //bookingMessage.textContent = `You have successfully booked a session with ${selectedMentor} on ${new Date(selectedDateTime).toLocaleString()}.\nStudent Name: ${studentName}\nStudent Email: ${studentEmail}`;
        alert(bookingMessage.textContent = `You have successfully booked a session with ${selectedMentor} on ${new Date(selectedDateTime).toLocaleString()}.`);
        bookingMessage.style.color = 'green';

        // Reset the form and close the modal
        studentDetailsForm.reset();
        modal.style.display = "none";
    });

    // Handle booking form submission
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedDate = dateInput.value;
        const selectedTime = timeInput.value;
        const selectedDateTime = `${selectedDate}T${selectedTime}`;

        const selectedMentorObj = mentors.find(mentor => mentor.name === selectedMentor);

        // Check if the mentor is available at the selected time
        if (selectedMentorObj.availability.includes(selectedDateTime)) {
           // bookingMessage.textContent = `You have successfully booked a session with ${selectedMentor} on ${selectedDate} at ${selectedTime}.`;
           alert ('You have successfully booked a session with ${selectedMentor} on ${selectedDate} at ${selectedTime}.')
           bookingMessage.style.color = 'green';
        } else {
            //bookingMessage.textContent = `Sorry, ${selectedMentor} is not available at that time. Please choose another time.`;
            alert('Sorry, ${selectedMentor} is not available at that time. Please choose another time.')
            bookingMessage.style.color = 'red';
        }
        bookingForm.reset();
    });
});
