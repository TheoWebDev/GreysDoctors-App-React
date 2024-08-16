import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDoctor } from '../api/DoctorService';
// import { toastError, toastSuccess } from '../api/ToastService';

const DoctorDetail = ({ updateDoctor, updateImage }) => {
  const inputRef = useRef();
	const { id } = useParams();
  const [doctor, setDoctor] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: '',
    photoUrl: ''
  });

  const fetchDoctor = async (id) => {
    try {
      const { data } = await getDoctor(id);
      setDoctor(data);
      //toastSuccess('Contact retrieved');
    } catch (error) {
      //toastError(error.message);
    }
  };

  const selectImage = () => {
    inputRef.current.click();
  };

  const udpatePhoto = async (file) => {
  	try {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', id);
      await updateImage(formData);
      setDoctor((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}` }));
      //toastSuccess('Photo updated');
    } catch (error) {
      console.log(error);
      //toastError(error.message);
    }
  };

  const onChange = (event) => {
    setDoctor({ ...doctor, [event.target.name]: event.target.value });
  };

  const onUpdateDoctor = async (event) => {
    event.preventDefault();
    await updateDoctor(doctor);        
    fetchDoctor(id);
    //toastSuccess('Contact Updated');
  };

  useEffect(() => {
    fetchDoctor(id);
  }, [id]);

  return (
    <>
    <Link to={'/doctors'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
      <div className='profile'>
        <div className='profile__details'>
          <img src={doctor.photoUrl} alt={doctor.name} />
          <div className='profile__metadata'>
            <p className='profile__name'>{doctor.name}</p>
            <p className='profile__muted'>JPG or PNG. Max size of 10Mo</p>
            <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Change Photo</button>
          </div>
        </div>
        <div className='profile__settings'>
          <div>
            <form onSubmit={onUpdateDoctor} className="form">
              <div className="user-details">
                <input type="hidden" defaultValue={doctor.id} name="id" required />
                <div className="input-box">
                  <span className="details">Name</span>
                  <input type="text" value={doctor.name} onChange={onChange} name="name" required />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input type="text" value={doctor.email} onChange={onChange} name="email" required />
                </div>
                <div className="input-box">
                  <span className="details">Phone</span>
                  <input type="text" value={doctor.phone} onChange={onChange} name="phone" required />
                </div>
                <div className="input-box">
                  <span className="details">Address</span>
                  <input type="text" value={doctor.address} onChange={onChange} name="address" required />
                </div>
                <div className="input-box">
                  <span className="details">Title</span>
                  <input type="text" value={doctor.title} onChange={onChange} name="title" required />
                </div>
                <div className="input-box">
                  <span className="details">Status</span>
                  <input type="text" value={doctor.status} onChange={onChange} name="status" required />
                </div>
              </div>
              <div className="form_footer">
                <button type="submit" className="btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    <form style={{ display: 'none' }}>
      <input type='file' ref={inputRef} onChange={(event) => udpatePhoto(event.target.files[0])} name='file' accept='image/*' />
    </form>
  	</>
  )
}

export default DoctorDetail;