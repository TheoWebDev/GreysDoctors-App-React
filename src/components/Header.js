import React from 'react'

const Header = ({ toggleModal, nbOfDoctor }) => {
  return (
    <header className='header'>
        <div className='container'>
            <h3>Doctor List ({ nbOfDoctor })</h3>
            <button
                onClick={() => toggleModal(true)}
                className='btn'>
                    <i className='bi -bi-plus-sqaure'></i>Add New Doctor
            </button>
        </div>
    </header>
  )
}

export default Header
