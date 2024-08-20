import React from 'react'
import Doctor from './Doctor'
import { Link } from 'react-router-dom'

export default function DoctorList({ data, currentPage, getAllDoctors }) {
	
  return (
		<main className='main'>
      {data?.content?.length === 0 &&
        <div>
          <p>No Doctors. Please add a new doctor</p>
        </div>
      }

      <ul className='contact__list'>
        {data?.content?.length > 0 &&
          data.content.map(doctor =>
            <Doctor doctors={doctor} key={doctor.id} />
          )
        }
      </ul>

      {data?.content?.length > 0 && data?.totalPages > 1 &&
        <div className='pagination'>
          <Link
						onClick={() => getAllDoctors(currentPage - 1)}
						className={0 === currentPage ? 'disabled' : ''}>
							&laquo;
					</Link>

          { data && [...Array(data.totalPages).keys()].map((page, index) => 
            <Link
							onClick={() => getAllDoctors(page)}
							className={currentPage === page ? 'active' : ''}
							key={page}>
								{page + 1}
						</Link>
					)}

          <Link
						onClick={() => getAllDoctors(currentPage + 1)}
						className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>
							&raquo;
					</Link>
        </div>            
      }
    </main>
  )
}
