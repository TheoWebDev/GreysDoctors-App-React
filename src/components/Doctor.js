import React from 'react';
import { Link } from 'react-router-dom';
import { sliceInitials } from '../libs/SliceInitials';

export default function Doctor({ doctors }) {

  return (
    <Link to={`/doctors/${doctors.id}`} className={doctors.status === true ? 'contact__item_enabled' : 'contact__item_disabled'}>
      <div className="contact__header">
        <div className="contact__image">
          {doctors.photoUrl === null ?
            <h3 className='contact__image_name'>{sliceInitials(doctors.name)}</h3>
            :
            <img src={doctors.photoUrl} alt={doctors.name} />
          }
        </div>
        <div className="contact__details">
          <p className="contact_name">{doctors.name}</p>
          <p className="contact_title">{doctors.title}</p>
        </div>
      </div>
      <div className="contact__body">
        <p><i className="bi bi-envelope"></i>{doctors.email}</p>
        <p><i className="bi bi-geo"></i>{doctors.address}</p>
        <p><i className="bi bi-telephone"></i>{doctors.phone}</p>
        <p>
          {doctors.status === true ?
            <div>
              <i className='bi bi-check-circle'></i>
              Present
            </div>
          : 
            <div>
              <i className='bi bi-x-circle'></i>
              Holidays
            </div>
          }
        </p>
      </div>
    </Link>
  )
}
