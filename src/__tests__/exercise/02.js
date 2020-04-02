// simple test with React Testing Library
import React from 'react'
import ReactDOM from 'react-dom'
// 🐨 import the `render` and `fireEvent` utilities from '@testing-library/react'
import Counter from '../../components/counter'

test('counter increments when the button is clicked', () => {
  // 💣 remove these two lines, React Testing Library will create the div for you
  const div = document.createElement('div')
  document.body.appendChild(div)

  // 🐨 swap ReactDOM.render with React Testing Library's render
  // Note that React Testing Library's render doesn't need you to pass a `div`
  // so you only need to pass one argument. render returns an object with a
  // bunch of utilities on it. For now, let's just grab `container` which is
  // the div that React Testing Library creates for us.
  // 💰 const {container} = render(<Couter />)
  ReactDOM.render(<Counter />, div)

  // 🐨 instead of `div` here you'll want to use the `container` you get back
  // from React Testing Library
  const [decrement, increment] = div.querySelectorAll('button')
  const message = div.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')

  // 🐨 replace the next two statements with `fireEvent.click(button)`
  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  increment.dispatchEvent(incrementClickEvent)
  expect(message.textContent).toBe('Current count: 1')
  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  decrement.dispatchEvent(decrementClickEvent)
  expect(message.textContent).toBe('Current count: 0')

  // 🐨 replace this with `cleanup()` from React Testing Library
  document.body.removeChild(div)
})

// 💯 you'll want to cleanup after every test in this file, so you can use
// a utility in Jest to automatically run the `cleanup` function after each
// test. Read about it here and implement it at the top of the file:
// 📜 https://jestjs.io/docs/en/setup-teardown

// 💯 this project has @testing-library/jest-dom installed and configured. Swap
// `expect(button.textContent).toBe('0')` with
// `expect(button).toHaveTextContent('0')` and compare the error messages you
// get for those assertions.
