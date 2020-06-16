// testing custom hooks
// 💯 testing a hook via an example
// http://localhost:3000/undo

import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UseUndoExample from '../../examples/undo'

test('allows you to undo and redo', () => {
  render(<UseUndoExample />)

  const present = screen.getByText(/present/i)
  const past = screen.getByText(/past/i)
  const future = screen.getByText(/future/i)
  const input = screen.getByRole('textbox', {name: /new value/i})
  const submit = screen.getByRole('button', {name: /submit/i})
  const undo = screen.getByRole('button', {name: /undo/i})
  const redo = screen.getByRole('button', {name: /redo/i})

  // assert initial state
  expect(undo).toBeDisabled()
  expect(redo).toBeDisabled()
  expect(past).toHaveTextContent(`Past:`)
  expect(present).toHaveTextContent(`Present: one`)
  expect(future).toHaveTextContent(`Future:`)

  // add second value
  userEvent.type(input, 'two')
  userEvent.click(submit)
  // assert new state
  expect(undo).not.toBeDisabled()
  expect(redo).toBeDisabled()
  expect(past).toHaveTextContent(`Past: one`)
  expect(present).toHaveTextContent(`Present: two`)
  expect(future).toHaveTextContent(`Future:`)

  // add third value
  userEvent.type(input, 'three')
  userEvent.click(submit)
  // assert new state
  expect(undo).not.toBeDisabled()
  expect(redo).toBeDisabled()
  expect(past).toHaveTextContent(`Past: one, two`)
  expect(present).toHaveTextContent(`Present: three`)
  expect(future).toHaveTextContent(`Future:`)

  // undo
  userEvent.click(undo)
  // assert "undone" state
  expect(undo).not.toBeDisabled()
  expect(redo).not.toBeDisabled()
  expect(past).toHaveTextContent(`Past: one`)
  expect(present).toHaveTextContent(`Present: two`)
  expect(future).toHaveTextContent(`Future: three`)

  // undo again
  userEvent.click(undo)
  // assert "undone" state
  expect(undo).toBeDisabled()
  expect(redo).not.toBeDisabled()
  expect(past).toHaveTextContent(`Past:`)
  expect(present).toHaveTextContent(`Present: one`)
  expect(future).toHaveTextContent(`Future: two, three`)

  // redo
  userEvent.click(redo)
  // assert undo + undo + redo state
  expect(undo).not.toBeDisabled()
  expect(redo).not.toBeDisabled()
  expect(past).toHaveTextContent(`Past: one`)
  expect(present).toHaveTextContent(`Present: two`)
  expect(future).toHaveTextContent(`Future: three`)

  // add fourth value
  userEvent.type(input, 'four')
  userEvent.click(submit)
  // assert final state (note the lack of "three")
  expect(undo).not.toBeDisabled()
  expect(redo).toBeDisabled()
  expect(past).toHaveTextContent(`Past: one, two`)
  expect(present).toHaveTextContent(`Present: four`)
  expect(future).toHaveTextContent(`Future:`)
})
