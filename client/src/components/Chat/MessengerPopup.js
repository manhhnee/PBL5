import React, { useState } from 'react'
import './MessengerPopup.scss'
import Chatbot from './Chatbot'

const MessengerPopup = () => {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const minimizePopup = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <div
        className={`messenger-popup ${isOpen ? 'hide' : ''}`}
        onClick={togglePopup}
      >
        {/* Nội dung của toggle */}
      </div>
      <div className={`popup-content ${isOpen ? 'show-popup' : ''}`}>
          <div className='toggle-button' onClick={minimizePopup}>
            -
          </div>
        <div className='chatbot-container'>
          <Chatbot />
        </div>
      </div>
    </div>
  )
}

export default MessengerPopup
