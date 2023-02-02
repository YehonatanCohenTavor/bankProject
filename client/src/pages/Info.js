import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import Loading from './components/Loading'
import '../styles/info.css'
import Footer from './components/Footer'

function Info() {
  const { authorization } = useContext(AppContext)
  const location = useLocation()
  const navigate = useNavigate()
  const user_id = location.pathname.split('/')[2]
  const [costumerInfo, setCostumerInfo] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [changes, setChanges] = useState({})


  useEffect(() => {
    authorization(getInfo)
  }, [])

  const getInfo = async () => {
    const res = await fetch(`http://localhost:8000/customers/${user_id}/customerData`)
    const data = await res.json()
    console.log(data);
    setCostumerInfo(data)

  }

  const collectChanges = async ({ target }) => {
    const { name, value } = target;
    setChanges(prev => ({ ...prev, [name]: value }))
    console.log(changes);
  }

  const isUpdateInfo = async () => {
    setUpdating(true)
  }

  const submitChanges = async e => {
    e.preventDefault()
    const res = await fetch(`http://localhost:8000/customers/${user_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changes)
    })
    if (res.ok) {
      setUpdating(false);
      alert('Inforamtion successfully updated');
      navigate(`/UserPage/${user_id}`)
    }
    else {
      alert('Something went wrong');
    }
  }

  const cancelChanges = async e => {
    setUpdating(false)
  }

  if (costumerInfo === false) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <div className='UserInfo'>
      <h1>Personal Information</h1>
      {updating ? null : <button onClick={isUpdateInfo}> Change</button>}
      <form onSubmit={submitChanges}>
        <div className='buttons-continer'>
          {updating ? <button type='submit'>Submit</button> : null}
          {updating ? <button onClick={cancelChanges}>Cancel Changes</button> : null}
        </div>
        <ul className='userInfoList'>
          <li className='special'>
            <strong>First name</strong>
            {costumerInfo.first_name}
          </li>
          <li className='special'>
            <strong>Last Name</strong> {costumerInfo.last_name}
          </li>
          <li className='special'>
            <strong>E-mail</strong> {updating ? (
              <input name='email' type='email' onChange={collectChanges} />
            ) : (
              costumerInfo.email
            )}
          </li>
          <li className='special'>
            <strong>ID</strong> {costumerInfo.identity_number}
          </li>
          <li className='special'>
            <strong>Address</strong> {updating ? (
              <input name='address' type='text' onChange={collectChanges} />
            ) : (
              costumerInfo.address
            )}
          </li>
          <li className='special'>
            <strong>Birth Date</strong>
            {new Date(costumerInfo.birth_date).toLocaleDateString()}
          </li>
          <li className='special'>
            <strong>Phone</strong> {updating ? (
              <input name='phone' type='tel' onChange={collectChanges} pattern='^\d{3}-?\d{3}-?\d{4}$' />
            ) : (
              costumerInfo.phone
            )}
          </li>
          <li className='special'>
            <strong>Branch</strong>
            {costumerInfo.branch}
          </li>
        </ul>
      </form>
    </div>
  )
}

export default Info

