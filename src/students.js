const loginInput = document.querySelector('#email')
const loginButton = document.querySelector('#login')

const initApp = () => {
  console.log('App initialized. Waiting for user input...')
}

const findStudent = async (email) => {
  const url = `http://localhost:3000/students?email=${email}`

  try {
    const response = await fetch(url)

    if (response.ok) {
      const students = await response.json()

      if (students.length === 0) {
        alert('You need to register')
        location.href = '/src/pages/register.html'
      } else {
        const id = students[0].id
        location.href = '../pages/booking.html?id=' + id
      }
    } else {
      alert('Error connecting to the database.')
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }
}

const handleLogin = async () => {
  const email = loginInput.value.trim()

  if (email) {
    await findStudent(email)
  } else {
    alert('Please enter an email.')
  }
}

document.addEventListener('DOMContentLoaded', initApp)
loginButton.addEventListener('click', handleLogin)
