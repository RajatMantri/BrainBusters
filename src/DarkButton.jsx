import React from "react";
import './index.css';

const Dark=()=>{

    const modeToggle = document.querySelectorAll('.mode-toggle');

    modeToggle.forEach(item => {
        item.addEventListener('click', () => {
            document.body.classNameList.toggle('dark-mode');
        });
    });

    return(<>
     <button className="dark-mode-toggle">
            <svg className="sun" viewBox="0 0 24 24">
                <path d="M12 2c-1.178 0-2.274.221-3.301.602-2.342 1.056-4.11 3.024-5.039 5.54-.7 2.03-.7 4.198 0 6.228.929 2.516 2.697 4.484 5.039 5.54 1.027.381 2.123.602 3.301.602 4.418 0 8-3.582 8-8s-3.582-8-8-8zm0 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/>
            </svg>
            <svg className="moon" viewBox="0 0 24 24">
                <path d="M12 2c-1.178 0-2.274.221-3.301.602-2.342 1.056-4.11 3.024-5.039 5.54-.7 2.03-.7 4.198 0 6.228.929 2.516 2.697 4.484 5.039 5.54 1.027.381 2.123.602 3.301.602 4.418 0 8-3.582 8-8s-3.582-8-8-8zm0 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/>
            </svg>
        </button>
    </>);
}

export default Dark;