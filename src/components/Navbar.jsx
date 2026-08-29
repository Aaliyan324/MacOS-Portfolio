import React from 'react'
import { navIcons, navLinks } from '#constants'



const Navbar = () => {
  return (
    <nav>
        <div>
            <img src='/images/logo.svg' />
            <p className='font-bold'>Aaliyan's Portfolio</p>

            <ul>
                {navLinks.map(({ id, name })=>(
                    <li key={id}>
                        <p>{name}</p>
                    </li> 
                )
                )}
            </ul>
        </div>

        <div>
            <ul>
                {navIcons.map(({ id, img })=>(
                    <li key={id}>
                        <img src={img} className='icon-hover' alt={`icon-${id}`}/>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar