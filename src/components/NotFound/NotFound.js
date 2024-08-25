import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function NotFoundComponent() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };


  return (
    <>
      <div className="container-not-found">
        <div className="container-not-found-content">
          <h1>404</h1>
          <div className="content-not-found">
            <h2>Doctor not found</h2>
            <div className="content-not-found-div">
              <Link className='btn btn-go-back' onClick={handleGoBack}>BACK</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
