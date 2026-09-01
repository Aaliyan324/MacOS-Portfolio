import { dockApps } from '#constants'
import { Tooltip } from 'react-tooltip';
import React, { useRef } from 'react'

const Dock = () => {
    const docRef = useRef(null);

    const toggleApp=(app)=>{}

    return (
        <section id='dock'>

            <div ref={docRef} className='dock-container'>
                
                {dockApps.map(({id, name, icon, canOpen}) => (
                    <div key={id ?? name} className='relative flex justify-center'>
                        <button type='button' className='dock-icon' aria-label={name} data-tooltip-id="dock-tooltip" data-tooltip-content={name} data-tooltip-delay-show={150} disabled={!canOpen} onClick={()=>toggleApp({id, canOpen})}>
                            <img src={`/images/${icon}`} loading='lazy' className={canOpen ? '' : "opacity-60"} />
                        </button>
                    </div>
                ))}

                <Tooltip id='dock-tooltip' place='top' className='tooltip'/>

            </div>
        </section>
    )
}

export default Dock