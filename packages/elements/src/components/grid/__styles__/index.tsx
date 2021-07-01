import { styled } from 'linaria/react'
import { is4KScreen, isDesktop, isMobile, isTablet, isWideScreen } from '../../../styles/media'

export const ElGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;

  ${isTablet} {
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 2rem;
    grid-row-gap: 2.5rem;
  }
`

export const ElCol = styled.div`
  grid-column-end: span 8;

  ${isMobile} {
    grid-column-end: span 4;
  }

  ${isTablet} {
    grid-column-end: span 6;
  }

  ${isDesktop} {
    grid-column-end: span 4;
  }

  ${isWideScreen} {
    grid-column-end: span 3;
  }

  ${is4KScreen} {
    grid-column-end: span 2;
  }
`
