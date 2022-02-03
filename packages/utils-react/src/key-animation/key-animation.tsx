import React, { FC } from 'react'
import { cx } from '@linaria/core'
import {
  animationStep1,
  animationStep2,
  animationStep3,
  key,
  stars,
  svg,
  triangle1,
  triangle2,
  triangle3,
} from './__styles__/key-animation'

const resolveAnimationStep = (step: 1 | 2 | 3) => {
  switch (step) {
    case 1:
      return animationStep1
    case 2:
      return animationStep2
    case 3:
      return animationStep3
  }
}

export const KeyAnimation: FC<{ step: 1 | 2 | 3 }> = ({ step }) => {
  return (
    <>
      <svg
        className={cx(svg, resolveAnimationStep(step))}
        width="auto"
        height="auto"
        viewBox="0 0 360 900"
        preserveAspectRatio="xMinYMin meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H338L79 900H0V0Z" fill="#7BC9EB" />
        <path d="M0 682V437.5L236.5 900H0V682Z" fill="#0061A8" />
        <path d="M0 0H338L296.5 147.5L0 51.5V0Z" fill="#262F69" />
        <path
          d="M140.584 432.55C140.584 406.155 119.187 384.758 92.792 384.758C66.397 384.758 45 406.155 45 432.55C45 451.236 55.7299 467.406 71.359 475.264V497.256C71.359 509.093 80.9548 518.689 92.792 518.689C104.629 518.689 114.225 509.093 114.225 497.256V475.264C129.854 467.406 140.584 451.236 140.584 432.55Z"
          fill="#262F69"
        />
        <path
          className={key}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M240.637 353.593C287.495 353.593 325.483 391.58 325.483 438.438C325.483 485.297 287.495 523.283 240.637 523.283C204.115 523.283 172.981 500.205 161.024 467.837H135.009C133.577 467.837 132.273 467.254 131.33 466.319C130.422 465.403 129.846 464.147 129.813 462.763C129.744 459.843 127.527 457.441 124.605 457.441H108.918C107.485 457.441 106.182 458.024 105.238 458.959C104.303 459.903 103.72 461.207 103.72 462.639C103.72 465.512 101.387 467.837 98.5222 467.837H63V409.032H161.026C172.986 376.667 204.117 353.593 240.637 353.593ZM272.865 414.381C259.571 414.381 248.808 425.154 248.808 438.438C248.808 451.722 259.571 462.495 272.865 462.495C286.149 462.495 296.913 451.722 296.913 438.438C296.913 425.154 286.149 414.381 272.865 414.381Z"
          fill="#FFB71B"
        />
        <path d="M90.5 476.5V395.5L58 408L57.5 462L63 469L90.5 476.5Z" fill="#262F69" />
        <path
          className={cx(triangle1)}
          d="M236.948 826.948L284.817 774.52L186.817 750.127L236.948 826.948Z"
          fill="#23A4DE"
        />
        <path className={cx(triangle2)} d="M169 691.343L191.514 643L218 749L169 691.343Z" fill="#0061A8" />
        <path className={cx(triangle3)} d="M246 575H217L226.762 609L246 575Z" fill="#262F69" />
        <path
          className={stars}
          d="M352.357 364.46C351.7 364.353 351.062 364.202 350.462 364.011C346.062 362.617 343.527 359.086 342.633 354.499C342.548 354.065 341.919 354.076 341.85 354.513C340.997 359.876 337.916 363.711 332.506 364.813C332.076 364.901 332.087 365.523 332.52 365.595C337.915 366.496 341.183 370.214 342.218 375.501C342.283 375.834 342.636 375.83 342.616 375.822C342.808 375.819 342.971 375.677 343.001 375.486C343.433 372.743 344.715 369.004 348.37 366.77C349.538 366.057 350.884 365.543 352.371 365.243C352.56 365.205 352.694 365.037 352.69 364.845C352.687 364.653 352.546 364.491 352.357 364.46Z"
          fill="#FFB71B"
        />
        <path
          className={stars}
          d="M335.957 544.365C335.054 544.218 334.179 544.01 333.354 543.749C327.312 541.834 323.83 536.985 322.602 530.686C322.486 530.089 321.622 530.104 321.527 530.704C320.356 538.069 316.125 543.337 308.695 544.85C308.104 544.971 308.119 545.825 308.714 545.924C316.124 547.162 320.611 552.267 322.033 559.528C322.122 559.986 322.607 559.979 322.579 559.969C322.844 559.964 323.067 559.77 323.108 559.508C323.702 555.741 325.462 550.605 330.482 547.538C332.085 546.558 333.934 545.853 335.977 545.44C336.235 545.388 336.42 545.158 336.415 544.894C336.41 544.63 336.217 544.408 335.957 544.365Z"
          fill="#FFB71B"
        />
        <path
          className={stars}
          d="M324.61 309.463C323.072 309.212 321.581 308.859 320.177 308.414C309.887 305.152 303.958 296.895 301.867 286.168C301.669 285.151 300.198 285.177 300.036 286.2C298.042 298.742 290.837 307.712 278.184 310.29C277.178 310.495 277.203 311.95 278.217 312.119C290.834 314.226 298.477 322.92 300.897 335.285C301.049 336.064 301.875 336.054 301.827 336.037C302.278 336.028 302.659 335.697 302.729 335.251C303.739 328.835 306.738 320.09 315.285 314.866C318.016 313.198 321.165 311.997 324.644 311.293C325.084 311.205 325.398 310.814 325.389 310.364C325.381 309.915 325.053 309.536 324.61 309.463Z"
          fill="#FFB71B"
        />
      </svg>
    </>
  )
}
