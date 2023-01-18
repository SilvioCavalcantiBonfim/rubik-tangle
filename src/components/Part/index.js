import RopeFour from "./RopeFour";
import RopeOne from "./RopeOne";
import RopeThree from "./RopeThree";
import RopeTwo from "./RopeTwo";
import './index.css';
import React from "react";

const Part = (props) => {

    const [isSelect, setSelect] = React.useState(0);
    const [rotate, setRotate] = React.useState(0);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [ClickPosition, setClickPosition] = React.useState({ x: 0, y: 0 });

    const handleMove = React.useCallback((event) => {
        (isSelect === 1) && setPosition({ x: event.clientX - ClickPosition.x, y: event.clientY - ClickPosition.y })
    }, [ClickPosition]);

    React.useEffect(() => {
        if(isSelect)
            document.getElementById('root').addEventListener('mousemove', handleMove, true)
        else
            document.getElementById('root').removeEventListener('mousemove', handleMove, true)

    }, [isSelect]);

    return (
        <div
            style={{
                width: props.width || '200px',
                height: props.height || '200px',
                transform: `translate(${position.x}px, ${position.y}px) scale(1) rotate(${rotate*90}deg)`,
                cursor: ['grab', 'grabbing'][isSelect]
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                if(isSelect)
                    setRotate(v => (v+1)%4)
            }}
            className='card'
            onClick={(e) => {
                console.log(e.button)
                if (isSelect === 0)
                    setClickPosition({ x: e.clientX - position.x, y: e.clientY - position.y })
                setSelect(v => 1 - v);
            }
            }>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 829.000000 829.000000" preserveAspectRatio="xMidYMid meet">
                <RopeThree color={props.color[0]} />
                <RopeFour color={props.color[1]} />
                <RopeOne color={props.color[2]} />
                <RopeTwo color={props.color[3]} />
            </svg>
        </div>);
}

export default Part;