import React, { useState } from 'react'
import { BeakerIcon } from '@heroicons/react/24/solid'
import { Close } from '@mui/icons-material'
import Contact from './Contact'
import RestfulAPI from './MyRestApi'
import NavButtons from './NavButtons'
import ModalMenu from './ModalMenu'
import Resume from './Resume'
import TechStackScroll from './TechStack-scroll'
const MainHeader: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [clickedText, setClickedText] = useState<string>('')
  const [focus, setFocus] = useState<boolean>(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowModal(true)
    e.currentTarget.value ? setClickedText(e.currentTarget.value) : setClickedText('')
  }

  return (
    <div className='border flex rounded-full items-center text-sm shadow-sm hover:shadow-md m-auto'>
      <NavButtons
        handleClick={handleClick}
        showModal={showModal}
        title={clickedText}
        focus={focus}
        setFocus={setFocus}
      />
      {/* repos made */}
      {/* gitHub icon and link */}
      {showModal && (
        <div className='flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none no-scrollbar'>
          <div className='w-full h-fit bg-white z-50'>
            <ModalMenu title={clickedText} handleClick={handleClick} />

            <div className='grid grid-cols-3 items-center md:hidden pt-4 justify-items-center'>
              <Close className='text-red-500' type='button' onClick={() => setShowModal(false)} />
              <h2 className='text-base'>{clickedText}</h2>
              <BeakerIcon
                className='w-8 text-red-500 cursor-pointer'
                onClick={() => {
                  window.location.href = '#methods'
                }}
              />
            </div>
            <div className='md:hidden border max-w-fit m-auto rounded-full mt-4'>
              <NavButtons handleClick={handleClick} showModal={showModal} title={clickedText} />
            </div>
            {clickedText === 'Contact Me' ? <Contact /> : null}
            {clickedText === 'Restful API' ? <RestfulAPI /> : null}
            {clickedText === 'TechStack' ? <TechStackScroll /> : null}
            {clickedText === 'Resume' ? <Resume /> : null}
          </div>
          <button className='z-40' onClick={() => setShowModal(false)}>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
          </button>
        </div>
      )}
    </div>
  )
}

export default MainHeader
