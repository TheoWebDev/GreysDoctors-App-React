import React from 'react'
import Doctor from './Doctor'
import { Link } from 'react-router-dom'

const DoctorList = ({ data, currentPage, getAllDoctors }) => {
  return (
    <main className='main'>
      {data?.content?.length === 0 && <div>No Doctors. Please add a new doctor</div>}

			<ul className='contact__list'>
        {data?.content?.length > 0 && data.content.map(doctor => <Doctor doctor={doctor} key={doctor.id} />)}
			</ul>

			{
				data?.content?.length > 0 && data?.totalPages > 1 &&
				<div className='pagination'>
					<Link
						onClick={() => getAllDoctors(currentPage - 1)}
						className={0 === currentPage ? 'disabled' : ''}>
							&laquo;Previous Page
					</Link>
					
					{data && [...Array(data.totalPages).keys()].map((page, index) =>
						<Link
							onClick={getAllDoctors(page)}
							className={currentPage === page ? 'active' : ''}
							key={page}>
								{page + 1}
						</Link>
					)}

					<Link
						onClick={() => getAllDoctors(currentPage + 1)}
						className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>
							&raquo;Next Page
					</Link>
				</div>
			}

    </main>
  )
}

export default DoctorList
