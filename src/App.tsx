import './App.css'
import { Modal } from './components/Modal.tsx'
import { useState } from 'react'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  return (
    <>
      <button onClick={openModal}>open</button>
      <Modal
        open={isOpen}
        onClose={closeModal}
        options={{
          shouldCloseOnOverlayClick: true,
          closeButton: {
            enable: true,
            position: 'start',
            label: 'close',
          },
          crossIcon: {
            enable: true,
            position: 'start',
            color: 'black',
            size: '1em',
          },
        }}
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti eum excepturi fugiat
          ipsam quia rerum, saepe unde vero. Ab animi debitis id minus nihil porro repellendus
          reprehenderit sapiente sunt, voluptatum.
        </div>
      </Modal>
    </>
  )
}

export default App
