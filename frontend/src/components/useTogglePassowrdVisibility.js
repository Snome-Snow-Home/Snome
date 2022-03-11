import React, { useState } from 'react'

export default function UseTogglePasswordVisibility() {
    const [passwordVis, setPasswordVis] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVis(!passwordVis);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVis(!passwordVis);
        }
    };
    return {
        passwordVis,
        rightIcon,
        handlePasswordVisibility
    }
}


