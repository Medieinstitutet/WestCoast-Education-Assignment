const initApp = async () => {
  await displayCoursesWithRegistrations()
}

const fetchCourses = async () => {
  const response = await fetch('http://localhost:3000/courses')
  return response.ok ? response.json() : []
}

const fetchBookings = async () => {
  const response = await fetch('http://localhost:3000/bookings')
  return response.ok ? response.json() : []
}

const displayCoursesWithRegistrations = async () => {
  const courses = await fetchCourses()
  const bookings = await fetchBookings()

  const courseContainer = document.querySelector('main section:last-child')
  courseContainer.innerHTML = '<h2>Registered Courses</h2>'

  courses.forEach((course) => {
    const courseBookings = bookings.filter(
      (booking) => booking.courseId === course.id
    )
    const emails = courseBookings.map((booking) => booking.studentEmail)

    const courseElement = document.createElement('div')
    courseElement.classList.add('course-info')
    courseElement.innerHTML = `
      <h3>${course.title}</h3>
      <p><strong>Registered Users:</strong></p>
      <ul>${emails
        .map((studentEmail) => `<li>${studentEmail}</li>`)
        .join('')}</ul>
    `

    courseContainer.appendChild(courseElement)
  })
}

document.addEventListener('DOMContentLoaded', initApp)
