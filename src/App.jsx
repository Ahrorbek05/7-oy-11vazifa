import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const nameRef = useRef(null)
  const ageRef = useRef(null)
  const [editId, setEditId] = useState(null)
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  function handleSave(e) {
    e.preventDefault()

    const user = {
      name: nameRef.current.value,
      age: ageRef.current.value,
      id: editId ? editId : Date.now()
    }

    dispatch({ type: editId ? 'EDIT' : 'ADD', payload: user })

    nameRef.current.value = null
    ageRef.current.value = null
    setEditId(null)
  }

  function handleRemove(id) {
    let isDelete = confirm('Are you sure you want to delete?')
    if (isDelete) {
      dispatch({ type: 'REMOVE', payload: id })
    }
  }

  function handleEdit(user) {
    nameRef.current.value = user.name
    ageRef.current.value = user.age
    setEditId(user.id)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <form onSubmit={handleSave} className="space-y-4 bg-white p-6 shadow-md rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Users Info</h2>
        <input
          ref={nameRef}
          type="text"
          placeholder='Enter name...'
          className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          ref={ageRef}
          type="number"
          placeholder='Enter age...'
          className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-200">
          {editId ? 'Update' : 'Save'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.users.length > 0 && users.users.map((user) => (
          <div key={user.id} className="bg-white border p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
            <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
            <p className="text-gray-500 mb-4">Age: {user.age}</p>

            <div className="flex justify-between space-x-2">
              <button
                onClick={() => handleRemove(user.id)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200 w-full"
              >
                Remove
              </button>
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200 w-full"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
