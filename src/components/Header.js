import React from 'react'

const Header = ({ toggleModal, nbOfDoctor }) => {
  return (
    <header className='header'>
      <div className='container'>
        <h3>Doctors at Gray Sloan Memorial Hospital ({ nbOfDoctor })</h3>
        <button
          onClick={() => toggleModal(true)}
          className='btn'>
            <i className='bi bi-plus-square'></i>Add New Doctor
        </button>
      </div>
    </header>
  )
}

export default Header
