import * as React from 'react'
import { usePortal } from '../../hooks/UsePortal'
import { H4 } from '../Typography/index'

const { useMemo, useEffect } = React

export interface ModalProps {
  children: React.ReactChild
  title?: string
  visible: boolean
  size?: 'medium' | 'small'
  afterClose?: () => void
  deps?: any[]
  footerItems?: React.ReactNode
}

export const Modal: React.FunctionComponent<ModalProps> = ({
  title,
  children,
  afterClose,
  visible,
  size = 'medium',
  deps,
  footerItems
}) => {
  // CLD-250: https://reapit.atlassian.net/secure/RapidBoard.jspa?rapidView=200&view=planning&selectedIssue=CLD-250
  // we can't access the showPortal in the component passed to usePortal
  // So we have to generate an id to it
  // bind event listener (click) to the element that match the ID
  const generatedModalBackgroundId = useMemo(() => {
    return Math.random()
      .toString(36)
      .substring(7)
  }, [])

  const [showPortal, hidePortal] = usePortal(
    () => (
      <div className="modal is-active" data-test="modal">
        <div className="modal-background" data-test="modal-background" id={generatedModalBackgroundId} />
        <div
          className={'modal-content ' + (size === 'medium' ? 'modal-medium' : 'modal-small')}
          data-test="modal-content"
        >
          <div className="modal-card">
            <header className="modal-card-head">
              <h4 className="modal-card-title is-4">{title}</h4>
              <button
                className="delete"
                aria-label="close"
                data-test="modal-close-button"
                onClick={event => {
                  event.preventDefault()
                  afterClose && afterClose()
                }}
              />
            </header>
            <section className="modal-card-body">{children}</section>
            {footerItems && <footer className="modal-card-foot">{footerItems}</footer>}
          </div>
        </div>
      </div>
    ),
    deps || [children]
  )

  useEffect(() => {
    if (visible) {
      showPortal()
    } else {
      hidePortal()
    }
  }, [visible])

  // CLD-250: handle click useEffect
  useEffect(() => {
    if (visible) {
      let element: HTMLElement | null
      let handleHidePortal = () => {
        hidePortal()
        afterClose && afterClose()
      }

      /**
       * Render function run asychonously.
       * Have to put this to the bottom of the Event loop queue
       */
      setTimeout(() => {
        element = document.getElementById(generatedModalBackgroundId)

        if (element) {
          element.addEventListener('click', handleHidePortal)
        }
      }, 1)

      return () => {
        if (element) {
          element.removeEventListener('click', handleHidePortal)
        }
      }
    }
  }, [visible])

  // CLD-250: handle key press useEffect
  useEffect(() => {
    const handleKeypressHidePortal = (e: KeyboardEvent) => {
      if (e.keyCode === 27 || e.key === 'Esc') {
        hidePortal()
        afterClose && afterClose()
      }
    }

    document.addEventListener('keydown', handleKeypressHidePortal)

    return () => {
      document.removeEventListener('keydown', handleKeypressHidePortal)
    }
  }, [])

  return null
}
