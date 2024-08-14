import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
// Components
import Header from './components/Header';
import Loader from './components/Loader/Loader';
import DoctorList from './components/DoctorList';

function App() {

  const [ data, setData ] = useState({});
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  const fetchDoctors = async (page = 0, size = 10) => {
    try {
      setLoading(true);
      setCurrentPage(page);
      const response = await fetch(`${process.env.REACT_APP_API_URL}?page=${page}&size=${size}`);
      if (!response.ok) {
        throw new Error('An error occurred while fetching data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const toggleModal = (show) => {}

  return (
    <>
    {loading ? (
        error ? (
          <div>Error: {error}</div>
        ) : (
          <div>
            <Loader />
          </div>
        )
      ) : (
        <>
        <Header toggleModal={toggleModal} nbOfDoctor={data?.totalElements} />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Navigate to='/doctors' />} />
            <Route path='/doctors' element={<DoctorList data={data} currentPage={currentPage} getAllDoctors={fetchDoctors} />} />
          </Routes>
        </div>
        </>
    )}
    </>
  );
}

export default App;
