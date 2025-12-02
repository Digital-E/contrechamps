import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Body from "../body"
import Video from "../video"
import Plyr from 'plyr';

let Container = styled.div`
    position: relative;
    height: 100%;
    width: 100%;

    video {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`


let Header = styled.div`
    position: relative;
    padding: 20px;
    margin-bottom: 15px;
    
    > span {
        font-size: 7vw;
    }

    @media(min-width: 768px) {
        padding: 0 20px;

        > span {
            font-size: 7vw;
            margin: 0;
            text-align: center;
        }
    }
`

let ListItem = styled.div`
    position: relative;

    display: flex;
    padding: 15px 20px;
    opacity: 1;

    > div {
        flex-basis: 50%;
    }

    transition: var(--transition-out);

    :hover {
        background: black;
        transition: var(--transition-in);
    }

    :hover {
        color: white;
    }


    @media(max-width: 1200px) {
        flex-direction: column;
    }
`

let ColLeft = styled.div``

let ColRight = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;

    > div:nth-child(2) {
        margin-top: auto;
        display: flex;
    }

    > div:nth-child(2) > div * {
        margin: 0;
    }

    > div:nth-child(2) > div:nth-child(1) {
        flex-basis: 40%;
    }

    > div:nth-child(2) > div:nth-child(2) {
        flex-basis: 60%;
    }

    @media(max-width: 1200px) {
        padding: 0;
        margin-top: 15px;

        > h1 {
            margin-bottom: 20px;
        }
    }
`

const Location = styled.div`
    * {
        font-size: inherit;
        margin: 0;
        line-height: 1.2;
    }
`

let SoundIcon = styled.div`
    position: absolute;
    // right: 20px;
    // bottom: 50px;
    top: 15px;
    right: 20px;
    z-index: 999;
    cursor: pointer;
    height: 30px;
    width: 30px;
    border: 1px solid black;
    border-radius: 999px;
    padding: 5px;
    backdrop-filter: blur(20px);
    pointer-events: all;

    svg {
        fill: black;
        height: 100%;
        width: 100%;
    }

    @media(max-width: 990px) {
        bottom: 0;
    }
`
let PlayPause = styled.div`
    position: absolute;
    right: 55px;
    top: 15px;
    pointer-events: all;
    backdrop-filter: blur(20px);
    border-radius: 999px;
    height: 30px;
    width: 30px;
    z-index: 1;

    svg {
        // height: 38px;
        // width: 38px;
    }
`



export default function Component({ data, title, index, cellIndex }) {
    let [soundOn, setSoundOn] = useState(false);
    let [play, setPlay] = useState(true);
    let videoRef = useRef();
    let playPauseRef = useRef();

    let item = data;


    // useEffect(() => {
    //     const player = new Plyr('.player');
    // },[]);

    const toggleSound = () => {
        if(!soundOn) {
            // document.querySelectorAll(".orb-video").forEach(item => item.children[0].muted = false)
            videoRef.current.muted = false
            setSoundOn(!soundOn)
        } else {
            // document.querySelectorAll(".orb-video").forEach(item => item.children[0].muted = true)
            videoRef.current.muted = true
            setSoundOn(!soundOn)
        }
    }  
    
    const togglePlay = () => {
        if(!play) {
            // document.querySelectorAll(".orb-video").forEach(item => item.children[0].muted = false)
            videoRef.current.play()
            setPlay(!play)
        } else {
            // document.querySelectorAll(".orb-video").forEach(item => item.children[0].muted = true)
            videoRef.current.pause()
            setPlay(!play)
        }        
    }

    useEffect(() => {
        if(cellIndex !== index) {
            setPlay(false)
            videoRef.current.pause()
            setSoundOn(false)
            videoRef.current.muted = true
        }
    }, [cellIndex])

    return item?.video !== null ? (
    <>
    <Container>
    <PlayPause ref={playPauseRef}  onClick={() => togglePlay()}>
    {
        play ?
        // <span>PAUSE</span>
        <svg className="no-skip" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 37.75702 47.1962" x="0px" y="0px"><title>pause</title><path className="no-skip" d="M16.895,10.655H14.82875a.5649.5649,0,0,0-.57855.57849v15.29a.621.621,0,0,0,.57855.57849H16.895a.56489.56489,0,0,0,.57849-.57849v-15.29A.56489.56489,0,0,0,16.895,10.655Z" transform="translate(-0.00002 0.00002)"/><path className="no-skip" d="M20.862,10.655h2.06622a.57855.57855,0,0,1,.57855.57855V26.5235a.57849.57849,0,0,1-.57849.57849H20.862a.57849.57849,0,0,1-.57849-.57849v-15.29A.57849.57849,0,0,1,20.862,10.655Z"/><path className="no-skip" d="M18.87941,0A18.87848,18.87848,0,1,0,37.757,18.87937,18.90067,18.90067,0,0,0,18.87941,0Zm0,36.49408A17.61475,17.61475,0,1,1,36.49416,18.87937,17.63492,17.63492,0,0,1,18.87941,36.49405Z" transform="translate(-0.00002 0.00002)"/></svg>
        :
        <svg className="no-skip" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 29.1 36.375" x="0px" y="0px"><title>play</title><path className="no-skip" d="M10.7,9.03019v11.029a.727.727,0,0,0,1.12367.60932l8.53342-5.55478a.727.727,0,0,0-.00406-1.22126L11.81961,8.41824A.727.727,0,0,0,10.7,9.03019Z"/><path className="no-skip" d="M14.55067-.107A14.657,14.657,0,1,0,29.207,14.55067,14.67417,14.67417,0,0,0,14.55067-.107Zm0,28.33347A13.67582,13.67582,0,1,1,28.22649,14.55067,13.69152,13.69152,0,0,1,14.55067,28.22649Z"/></svg>

        // <span>PLAY</span>
    }        
    </PlayPause>
    <SoundIcon onClick={() => toggleSound()} className={soundOn ? "sound-on sound-icon" : "sound-off sound-icon"}> 
    {!soundOn ?
    <svg className="no-skip" width="18px" height="18px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <polygon className="no-skip" points="12.4 12.5 14.5 10.4 16.6 12.5 18 11.1 15.9 9 18 6.9 16.6 5.5 14.5 7.6 12.4 5.5 11 6.9 13.1 9 11 11.1"></polygon>
        <path className="no-skip" d="M3.78571429,6.00820648 L0.714285714,6.00820648 C0.285714286,6.00820648 0,6.30901277 0,6.76022222 L0,11.2723167 C0,11.7235261 0.285714286,12.0243324 0.714285714,12.0243324 L3.78571429,12.0243324 L7.85714286,15.8819922 C8.35714286,16.1827985 9,15.8819922 9,15.2803796 L9,2.75215925 C9,2.15054666 8.35714286,1.77453879 7.85714286,2.15054666 L3.78571429,6.00820648 Z"></path>
    </svg>
    :
    <svg className="no-skip" width="18px" height="18px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path className="no-skip" d="M15.5999996,3.3 C15.1999996,2.9 14.5999996,2.9 14.1999996,3.3 C13.7999996,3.7 13.7999996,4.3 14.1999996,4.7 C15.3999996,5.9 15.9999996,7.4 15.9999996,9 C15.9999996,10.6 15.3999996,12.1 14.1999996,13.3 C13.7999996,13.7 13.7999996,14.3 14.1999996,14.7 C14.3999996,14.9 14.6999996,15 14.8999996,15 C15.1999996,15 15.3999996,14.9 15.5999996,14.7 C17.0999996,13.2 17.9999996,11.2 17.9999996,9 C17.9999996,6.8 17.0999996,4.8 15.5999996,3.3 L15.5999996,3.3 Z"></path>
        <path className="no-skip" d="M11.2819745,5.28197449 C10.9060085,5.65794047 10.9060085,6.22188944 11.2819745,6.59785542 C12.0171538,7.33303477 12.2772954,8.05605449 12.2772954,9.00000021 C12.2772954,9.93588462 11.851678,10.9172014 11.2819745,11.4869049 C10.9060085,11.8628709 10.9060085,12.4268199 11.2819745,12.8027859 C11.4271642,12.9479755 11.9176724,13.0649528 12.2998149,12.9592565 C12.4124479,12.9281035 12.5156669,12.8776063 12.5978555,12.8027859 C13.773371,11.732654 14.1311161,10.1597914 14.1312523,9.00000021 C14.1312723,8.8299555 14.1286311,8.66015647 14.119665,8.4897429 C14.0674781,7.49784946 13.8010171,6.48513613 12.5978554,5.28197449 C12.2218894,4.9060085 11.6579405,4.9060085 11.2819745,5.28197449 Z"></path>
        <path className="no-skip" d="M3.78571429,6.00820648 L0.714285714,6.00820648 C0.285714286,6.00820648 0,6.30901277 0,6.76022222 L0,11.2723167 C0,11.7235261 0.285714286,12.0243324 0.714285714,12.0243324 L3.78571429,12.0243324 L7.85714286,15.8819922 C8.35714286,16.1827985 9,15.8819922 9,15.2803796 L9,2.75215925 C9,2.15054666 8.35714286,1.77453879 7.85714286,2.15054666 L3.78571429,6.00820648 Z"></path>
    </svg>  
    }                
    </SoundIcon>        
    <video ref={videoRef} muted autoPlay loop>
        <source src={item.videoMp4} type="video/mp4" />
    </video>
    {/* <Header className="border-bottom border-top"><span className="h1">{title}</span></Header> */}
    {/* <ListItem key={item?._id} className="border-bottom">
            <ColLeft>
                <Video data={item?.video} />
            </ColLeft>
            <ColRight>
                <h1>{item?.title}</h1>
                <div>
                    <div>
                        <div className="h4">
                            <Body content={item?.textfieldone} />
                        </div>
                        <div>

                        </div>
                    </div>
                    <Location className="h4">
                        <div><Body content={item?.textfieldtwo} /></div>
                    </Location>
                </div>
            </ColRight>
    </ListItem> */}
    </Container>
    </>
    )
    :
    null
}