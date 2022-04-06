import React, { useState } from "react";
import * as AwesomeButton from 'react-awesome-button';
import './index.css';
import 'react-awesome-button/dist/themes/theme-blue.css';

const InputNumber = ({onMinus, onPlus, onMax, value, max}) => {

    // const [value, setValue] = useState(0);

    return (
        <div className="flex row input-number">
            <AwesomeButton.AwesomeButton className="flex input-minus" onPress={onMinus}>-</AwesomeButton.AwesomeButton>
            <div className="flex input-value">
                <input type='number' min={1} value={value} max={max} maxLength={max} className='flex input-value'/>
            </div>
            <AwesomeButton.AwesomeButton className="flex input-plus" onPress={onPlus}>+</AwesomeButton.AwesomeButton>
            <AwesomeButton.AwesomeButton onPress={onMax}>Set Max</AwesomeButton.AwesomeButton>
        </div>
    )
}

export default InputNumber;