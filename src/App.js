// React
import { useEffect, useRef, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// React Toast
// import { toastError } from './api/ToastService';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// Components
import Header from './components/Header'
import DoctorList from './components/DoctorList'
import DoctorDetail from './components/DoctorDetails';
import Loader from './components/Loader/Loader';
// API
import { getDoctors, createDoctor, udpatePhoto } from './api/DoctorService';

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: '',
  });

  const getAllDoctors = async (page = 0, size = 12) => {
    try {
      setLoading(true);
      setCurrentPage(page);
      const { data } = await getDoctors(page, size);
      setData(data);
    } catch (error) {
      setError(error.message);
      //toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createDoctor(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', data.id);
      const { data: photoUrl } = await udpatePhoto(formData);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
      })
      getAllDoctors();
    } catch (error) {
      //toastError(error.message);
    }
  };

  const updateDoctor = async (doctor) => {
    try {
      const { data } = await createDoctor(doctor);
    } catch (error) {
      //toastError(error.message);
    }
  };

  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await udpatePhoto(formData);
    } catch (error) {
      //toastError(error.message);
    }
  };

  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <>
    {loading ? (
      error ? (
        <div>
          <p>Error: {error}</p>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
        )
      ) : (
        <>
        <Header toggleModal={toggleModal} nbOfDoctor={data.totalElements} />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Navigate to={'/doctors'} />} />
              <Route path="/doctors" element={<DoctorList data={data} currentPage={currentPage} getAllDoctors={getAllDoctors} />} />
              <Route path="/doctors/:id" element={<DoctorDetail updateDoctor={updateDoctor} updateImage={updateImage} />} />
            </Routes>
          </div>

          {/* Modal */}
          <dialog ref={modalRef} className="modal" id="modal">
            <div className="modal__header">
              <h3>New Contact</h3>
              <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
            </div>
            <div className="divider"></div>
            <div className="modal__body">
              <form onSubmit={handleNewDoctor}>
                <div className="user-details">
                  <div className="input-box">
                    <span className="details">Name</span>
                    <input type="text" value={values.name} onChange={onChange} name='name' required />
                  </div>
                  <div className="input-box">
                    <span className="details">Email</span>
                    <input type="text" value={values.email} onChange={onChange} name='email' required />
                  </div>
                  <div className="input-box">
                    <span className="details">Title</span>
                    <input type="text" value={values.title} onChange={onChange} name='title' required />
                  </div>
                  <div className="input-box">
                    <span className="details">Phone Number</span>
                    <input type="text" value={values.phone} onChange={onChange} name='phone' required />
                  </div>
                  <div className="input-box">
                    <span className="details">Address</span>
                    <input type="text" value={values.address} onChange={onChange} name='address' required />
                  </div>
                  <div className="input-box">
                    <span className="details">Account Status</span>
                    <input type="text" value={values.status} onChange={onChange} name='status' required />
                  </div>
                  <div className="file-input">
                    <span className="details">Profile Photo</span>
                    <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
                  </div>
                </div>
                <div className="form_footer">
                  <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
                  <button type='submit' className="btn">Save</button>
                </div>
              </form>
            </div>
          </dialog>
          {/* <ToastContainer /> */}
        </>
      )}
    </>
  );
}

export default App;
