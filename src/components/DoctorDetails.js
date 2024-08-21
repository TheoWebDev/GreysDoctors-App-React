import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDoctor } from '../api/DoctorService';
import { toastError, toastSuccess } from '../api/ToastService';
import { sliceInitials } from '../libs/SliceInitials';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function DoctorDetail({ updateDoctor, updateImage }) {
  const inputRef = useRef();
  const navigate = useNavigate();
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
    } catch (error) {
      toastError(error.message);
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
      toastSuccess('Photo successfully updated');
      fetchDoctor(id);
    } catch (error) {
      toastError(error.message);
    }
  };

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    setDoctor({ ...doctor, [name]: finalValue });
};

  const onUpdateDoctor = async (e) => {
    e.preventDefault();
    await updateDoctor(doctor);
    toastSuccess('Doctor successfully updated', () => {
      fetchDoctor(id);
      navigate("/", { state: { updated: true } });
    });
  };

  useEffect(() => {
    fetchDoctor(id);
  }, [id]);

  return (
    <>
    <Link to={'/doctors'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
      <div className='profile'>
        <div className='profile__details'>
        <div className="profile__details__image">
          {doctor.photoUrl === null ?
            <h3 className='contact__image_name'>{sliceInitials(doctor.name)}</h3>
            :
            <img src={doctor.photoUrl} alt={doctor.name} />
          }
        </div>
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
                  <input type="checkbox" checked={doctor.status} onChange={onChange} name="status" />
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
      <input type='file' ref={inputRef} onChange={(e) => udpatePhoto(e.target.files[0])} name='file' accept='image/*' />
    </form>
  	</>
  )
}
