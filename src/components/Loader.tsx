
import React, { Suspense } from 'react';

const Loader = () => {
    return (
        <Suspense>
           <div className="flex justify-center items-center h-screen w-full">
            <div className="loader "></div>
           </div>
        </Suspense>
    )
}

export default Loader