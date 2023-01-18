import RopeFour from "./RopeFour";
import RopeOne from "./RopeOne";
import RopeThree from "./RopeThree";
import RopeTwo from "./RopeTwo";
import './index.css';
import React from "react";

const Part = (props) => {
    const processTransform = (state, action) => {
        switch (action.mode) {
            case `SETPOSITION`:
                return { ...state, position: { x: action.event.clientX - state.clickPosition.x, y: action.event.clientY - state.clickPosition.y } }
                break;
            case `SETROTATION`:
                return { ...state, rotate: (state.rotate + 1) % 4 }
                break;
            case `SETCLICKPOSITION`:
                return { ...state, clickPosition: { x: action.event.clientX - state.position.x, y: action.event.clientY - state.position.y } }
                break;
            case `TAGGLESELECT`:
                return { ...state, isSelect: 1 - state.isSelect }
                break;
            default:
                break;
        }
    }

    const [transform, dispatcherTransform] = React.useReducer(processTransform,
        {
            position: {
                x: 0,
                y: 0
            },
            clickPosition: {
                x: 0,
                y: 0
            },
            isSelect: 0,
            rotate: 0
        });

    const handleMove = React.useCallback((event) => {
        if (transform.isSelect) {
            dispatcherTransform({ mode: `SETPOSITION`, event: event })
        }
    }, [transform.clickPosition]);

    React.useEffect(() => {
        if (transform.isSelect)
            document.getElementById('root').addEventListener('mousemove', handleMove, true)
        else
            document.getElementById('root').removeEventListener('mousemove', handleMove, true)

    }, [transform.isSelect]);

    return (
        <div
            style={{
                width: props.width || '200px',
                height: props.height || '200px',
                transform: `translate(${transform.position.x}px, ${transform.position.y}px) rotate(${transform.rotate * 90}deg)`,
                cursor: ['grab', 'grabbing'][transform.isSelect],
                boxShadow: [`rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px`, `rgba(0, 0, 0, 0.35) 0px 5px 15px`][transform.isSelect],
                zIndex: transform.isSelect,
                backgroundColor: `rgba(255, 255, 255, ${[1,0.5][transform.isSelect]})`
            }}
            className='card'

            onContextMenu={(e) => {
                e.preventDefault();
                (transform.isSelect) && dispatcherTransform({ mode: `SETROTATION` })
            }}

            onClick={(e) => {
                (!transform.isSelect) && dispatcherTransform({ mode: `SETCLICKPOSITION`, event: e })
                dispatcherTransform({ mode: `TAGGLESELECT` })
            }} 
        >
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 829.000000 829.000000" preserveAspectRatio="xMidYMid meet">
                <RopeThree color={props.color[0]} />
                <RopeFour color={props.color[1]} />
                <RopeOne color={props.color[2]} />
                <RopeTwo color={props.color[3]} />
            </svg>
        </div>);
}

export default Part;