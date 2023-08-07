import React from 'react'
import { backgroundLeft, backgroundRight } from '../../assets/svg/background'

export default function Background() {
  return (
    <div className='background fixed -z-50 top-0 left-0 right-0 bottom-0 overflow-hidden w-full h-full '>
          <div className='w-[400px] absolute bottom-0 right-0 max-w-[30%]'>
            {backgroundLeft()}
          </div>
          <div className='w-[400px] absolute bottom-0 left-0 max-w-[30%]'>
            {backgroundRight()}
          </div>
      </div>
  )
}
