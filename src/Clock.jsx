import { useState } from 'react';
import { useEffect } from 'react';

function Clock(){
    const[clock, SetClock] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            SetClock(new Date());
        }, 100);
        return () => {
        clearInterval(timer);
    };
    }, []);

    return(
        <div>
            <h3>
                Ora este: 
            </h3>
            <p>{clock.toLocaleTimeString()}</p>
        </div>
    );

}

export default Clock;