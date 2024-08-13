import React from 'react'
import { Link } from 'react-router-dom'

const Doctor = ({ doctors }) => {
  return (
    <Link to={`/doctors/${doctors.id}`} className="contact__item">
      <div className="contact__header">
        <div className="contact__image">
          <img src={doctors.photoUrl} alt={doctors.name}  />
        </div>
        <div className="contact__details">
          <p className="contact_name">{doctors.name.substring(0, 15)} </p>
          <p className="contact_title">{doctors.title}</p>
        </div>
      </div>
      <div className="contact__body">
        <p><i className="bi bi-envelope"></i> {doctors.email.substring(0, 20)} </p>
        <p><i className="bi bi-geo"></i> {doctors.address}</p>
        <p><i className="bi bi-telephone"></i> {doctors.phone}</p>
        <p>{doctors.status === 'Active' ? <i className='bi bi-check-circle'></i> : 
          <i className='bi bi-x-circle'></i>} {doctors.status}</p>
      </div>
    </Link>
  )
}

export default Doctor
