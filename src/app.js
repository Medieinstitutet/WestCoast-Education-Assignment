import { createCourseDisplay } from './dom.js'

const list = document.querySelector('#courses')
const form = document.querySelector('#new-course')
const deleteBtn = document.querySelector('#delete')
const updateBtn = document.querySelector('#update')

const initApp = () => {
  loadCourses()
}

const loadCourses = async () => {
  const url = 'http://localhost:3000/courses'
  const response = await fetch(url) //GET ANROP...

  if (response.ok) {
    const courses = await response.json() //Hämta ut data ur body...
    displayCourses(courses)
  }
}

const displayCourses = (courses) => {
  list.innerHTML = ''
  list.insertAdjacentHTML('beforeend', createCourseDisplay(courses))

  document.querySelectorAll('.course-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      const courseId = event.currentTarget.getAttribute('data-id')

      location.href = `/src/pages/course-details.html?id=${courseId}`
    })
  })
}

//Save Course
const handleSaveCourse = async (e) => {
  e.preventDefault()

  const data = new FormData(form)
  data.append('imageUrl', 'image1.jpg')
  // Object.from Entries gör om data till ett JavaScript objekt...
  const body = Object.fromEntries(data)

  try {
    const response = await fetch('http://localhost:3000/courses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    console.log(await response.json())
    await loadCourses()
  } catch (error) {
    console.error(error)
  }
}

//Delete Course
const handleDeleteCourse = async (e) => {
  e.preventDefault()

  const url = 'http://localhost:3000/courses/5'

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    })

    await loadCourses()
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

//Update Course
const handleUpdateCourse = async (e) => {
  e.preventDefault()

  const url = 'http://localhost:3000/courses/4'

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courses),
    })

    await loadCourses()
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

document.addEventListener('DOMContentLoaded', initApp)
form.addEventListener('submit', handleSaveCourse)
deleteBtn.addEventListener('click', handleDeleteCourse)
updateBtn.addEventListener('click', handleUpdateCourse)
