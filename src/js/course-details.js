let id = 0;
const initApp = () => {
  id = location.search.split('=')[1];

  if (!id) {
    document.querySelector('#course-details').innerHTML =
      '<p>Course not found.</p>';
    return;
  }

  fetch('http://localhost:3000/courses/')
    .then((response) => response.json())
    .then((data) => {
      const course = data.find((course) => course.id === id);

      if (!course) {
        document.querySelector('#course-details').innerHTML =
          '<p>Course not found.</p>';
        return;
      }

      document.querySelector('#course-details').innerHTML = `
        <h1>${course.title}</h1>
        <img src="/src/assets/images/${course.imageUrl}" alt="${course.title}">
        <p><strong>Instructor:</strong> ${course.instructor}</p>
        <p><strong>Start Date:</strong> ${course.course_startDate}</p>
        <p><strong>Duration:</strong> ${course.course_duration}</p>
        <p><strong>Price:</strong> ${course.course_price}</p>
        <p><strong>Mode:</strong> ${course.isClassroom_orDemand}</p>
        <p><strong>Rating:</strong> ${course.vote_average} ⭐</p>
        <p><strong>Description:</strong> ${course.course_description}</p>
        <button id="book-course">Book Course</button>
      `;

      document.body.style.background = `url('/src/assets/images/${course.imageUrl}') no-repeat center center fixed`;
      document.body.style.backgroundSize = 'cover';

      const bookCourseButton = document.querySelector('#book-course');

      bookCourseButton.addEventListener('click', () => {
        location.href = '../pages/login.html?id=' + id;
      });
    })
    .catch((error) => {
      console.error('Error loading course details:', error);
      document.querySelector('#course-details').innerHTML =
        '<p>Failed to load course details.</p>';
    });
};

document.addEventListener('DOMContentLoaded', initApp);
