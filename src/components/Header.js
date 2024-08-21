import React from 'react'

export default function Header({ toggleModal, nbOfDoctor }) {
  return (
    <header className='header'>
      <div className='container'>
        <h3>Doctors at Grey Sloan Memorial Hospital ({ nbOfDoctor })</h3>
        <button
          onClick={() => toggleModal(true)}
          className='btn'>
            <i className='bi bi-plus-square'></i>New Doctor
        </button>
      </div>
    </header>
  )
}

