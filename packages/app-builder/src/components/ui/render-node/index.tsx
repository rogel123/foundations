import { useNode, useEditor } from '@craftjs/core'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import React, { useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { elFlex, elFlex1, elFlexAlignCenter, elMr3, elMr6, elP3 } from '@reapit/elements'

import ArrowUp from '../../icons/arrow-up'
import Delete from '../../icons/delete'
import Move from '../../icons/move'
import { cursorMove, cursorPointer, textWhite } from '../styles'
import { componentSelected, indicator, littleButton } from './styles'

const HeaderContainer = styled.header`
  grid-column: span 12;
  overflow: hidden;
  border-radius: 4px;
`

const FooterContainer = styled.footer`
  grid-column: span 12;
  overflow: hidden;
  border-radius: 4px;
`

const BodyContainer = styled.section`
  margin-top: 20px;
  margin-bottom: 20px;
  grid-column: span 12;
  overflow: hidden;
  border-radius: 4px;
`

const RootContainer = styled.section``

export const RenderNode = ({ render, iframeRef }) => {
  const { id } = useNode()
  const { actions, query, isActive, enabled } = useEditor((state) => ({
    isActive: !!state.nodes[id]?.events.selected,
    enabled: state.options.enabled,
  }))

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
    actions: { setProp },
    isRoot,
  } = useNode((node) => {
    const nodeIsRoot = query.node(node.id).isRoot()
    let isDeletable =
      query.node(node.id).isDeletable() &&
      node.id !== 'header' &&
      node.id !== 'body' &&
      node.id !== 'footer' &&
      !nodeIsRoot
    if (isDeletable && node.data.custom.isDeletable) {
      isDeletable = node.data.custom.isDeletable(node)
    }

    return {
      isHover: node.events.hovered,
      dom: node.dom,
      name: node.data.custom.displayName || node.data.displayName,
      moveable:
        query.node(node.id).isDraggable() &&
        node.id !== 'header' &&
        node.id !== 'body' &&
        node.id !== 'footer' &&
        !nodeIsRoot,
      deletable: isDeletable,
      parent: node.data.parent,
      props: node.data.props,
      isRoot: nodeIsRoot,
    }
  })

  const currentRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (isRoot) {
      return
    }

    if (isActive || isHover) {
      dom?.classList.add(componentSelected)
    } else {
      dom?.classList.remove(componentSelected)
    }
  }, [dom, isActive, isHover, isRoot])

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom, right } = dom ? dom.getBoundingClientRect() : { top: 0, left: 0, bottom: 0, right: 0 }
    return {
      top: top > 0 ? top : bottom,
      left,
      right,
      height: bottom - top,
    }
  }, [])

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef

    if (!currentDOM || !dom) return
    const { top, left } = getPos(dom)
    currentDOM.style.top = `${top}px`
    currentDOM.style.left = `${left}px`
  }, [dom, getPos])

  useEffect(() => {
    document.querySelector('#craftjs-renderer')?.addEventListener('scroll', scroll)

    return () => {
      document.querySelector('#craftjs-renderer')?.removeEventListener('scroll', scroll)
    }
  }, [scroll])

  const container = iframeRef?.contentDocument?.body.querySelector('#page-container')

  const isHeader = id === 'header'
  const isFooter = id === 'footer'
  const isBody = id === 'body'

  return (
    <>
      {(isHover || isActive) &&
        !isRoot &&
        enabled &&
        container &&
        dom &&
        ReactDOM.createPortal(
          <div
            /*
              // @ts-ignore */
            ref={currentRef}
            className={cx(indicator, elP3, elFlex, elFlexAlignCenter)}
            style={{
              left: getPos(dom).left,
              top: getPos(dom).top,
              zIndex: 9999,
            }}
          >
            <h2 className={cx(elFlex1, elMr6)}>
              {isHeader && 'Header'}
              {isFooter && 'Footer'}
              {isBody && 'Body'}
              {!isHeader && !isFooter && !isBody && name}
            </h2>
            {moveable && (
              <>
                <a
                  title="Increase block width"
                  className={cx(littleButton, elMr3, textWhite)}
                  style={{ fontSize: 18, fontWeight: 800 }}
                  onClick={() => {
                    setProp((props) => {
                      props.width++
                      if (props.width > 12) {
                        props.width = 12
                      }
                    })
                  }}
                >
                  +
                </a>
                <a
                  title="Decrease block width"
                  className={cx(littleButton, elMr3, textWhite)}
                  style={{ fontSize: 18, fontWeight: 800 }}
                  onClick={() => {
                    setProp((props) => {
                      props.width--
                      if (props.width < 1) {
                        props.width = 1
                      }
                    })
                  }}
                >
                  —
                </a>
              </>
            )}
            {moveable && (
              <div
                className={cx(littleButton, elMr3, cursorMove)}
                /*
                  // @ts-ignore */
                ref={drag}
              >
                <Move />
              </div>
            )}
            {id !== 'ROOT' && id !== 'header' && id !== 'footer' && id !== 'body' && (
              <a
                className={cx(littleButton, elMr3, cursorPointer)}
                onClick={() => {
                  actions.selectNode(parent)
                }}
              >
                <ArrowUp />
              </a>
            )}
            {deletable && (
              <a
                className={cx(littleButton, cursorPointer)}
                onMouseDown={(e: React.MouseEvent) => {
                  e.stopPropagation()
                  actions.delete(id)
                }}
              >
                <Delete />
              </a>
            )}
          </div>,
          container,
        )}
      {isHeader && <HeaderContainer>{render}</HeaderContainer>}
      {isFooter && <FooterContainer>{render}</FooterContainer>}
      {isBody && <BodyContainer>{render}</BodyContainer>}
      {isRoot && <RootContainer>{render}</RootContainer>}
      {!isHeader && !isFooter && !isBody && !isRoot && render}
    </>
  )
}
