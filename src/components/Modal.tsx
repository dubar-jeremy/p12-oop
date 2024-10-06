import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export type ModalPositionElementType = 'start' | 'center' | 'end'

export interface ModalOptions {
  crossIcon?: {
    enable?: boolean
    position?: ModalPositionElementType
    customIcon?: ReactNode
    className?: string
    size?: string
    color?: string
    backgroundColor?: string
    padding?: string
  }
  closeButton?: {
    enable?: boolean
    position?: ModalPositionElementType
    label?: string
  }
  shouldCloseOnOverlayClick?: boolean
}

interface ModalProps {
  open: boolean
  onOpen?: () => void
  onClose?: () => void
  options?: ModalOptions
}

export const Modal = ({
  open,
  onOpen,
  onClose,
  options = {},
  children,
}: PropsWithChildren<ModalProps>) => {
  const {
    crossIcon = {
      enable: true,
      position: 'end',
      size: '1em',
      customIcon: undefined,
      className: undefined,
      color: undefined,
      backgroundColor: undefined,
      padding: undefined,
    },
    closeButton = { enable: true, position: 'end', label: 'close' },
    shouldCloseOnOverlayClick = false,
  } = options

  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open && onOpen) {
      onOpen()
    }
  }, [open, onOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        shouldCloseOnOverlayClick &&
        modalRef.current &&
        modalRef.current instanceof Node &&
        e.target instanceof Node &&
        !modalRef.current.contains(e.target)
      ) {
        if (onClose) {
          onClose()
        }
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, shouldCloseOnOverlayClick, onClose])

  if (!open) return null

  return createPortal(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '1em',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
      className="modal"
      ref={modalRef}
    >
      {crossIcon.enable && (
        <div
          style={{
            display: 'flex',
            justifyContent: `flex-${crossIcon.position}`,
          }}
        >
          <button
            onClick={onClose}
            className={crossIcon.className ?? ''}
            aria-label="Close"
            style={{
              backgroundColor: crossIcon.backgroundColor ?? 'white',
              padding: crossIcon.padding ?? '0',
              color: crossIcon.color ?? 'black',
              fontSize: crossIcon.size ?? '1em',
            }}
          >
            {crossIcon.customIcon ?? '\u2716'}
          </button>
        </div>
      )}
      <div>{children}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: `flex-${closeButton.position}`,
        }}
      >
        {closeButton.enable && <button onClick={onClose}>{closeButton.label}</button>}
      </div>
    </div>,
    document.body,
  )
}
