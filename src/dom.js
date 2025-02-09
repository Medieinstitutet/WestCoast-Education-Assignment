export const createCourseDisplay = (courses) => {
  let html = ''

  courses.forEach((course) => {
    html += `
      <div class="course-image">
        <a href="/src/pages/course-details.html" class="course-link" data-id="${course.id}">
          <img src="../src/assets/images/${course.imageUrl}" id="${course.id}"/>
        </a>
        <p>${course.title} : ${course.course_price}</p>
      </div>
    `
  })

  return html
}
