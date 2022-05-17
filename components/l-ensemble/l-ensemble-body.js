import { useEffect, useRef } from "react";

import styled from "styled-components"
import Body from "../body"

import Image from "../image"
import Video from "../video"

import Menu from "./l-ensemble-menu"

import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-top: 100px;
  
  @media(max-width: 767px) {
    flex-wrap: wrap;
    margin-top: 20px;
}
`

const ColLeft = styled.div`
  flex-basis: 30%;

  @media(max-width: 767px) {
      flex-basis: 100%;
      margin-bottom: 50px;
  }
`

const ColRight = styled.div`
  flex-basis: 70%;

    @media(max-width: 767px) {
        flex-basis: 100%;
    }
`

const SliceWrapper = styled.div`
    margin: 0 0 30px 0;

    &.double-col * {
        columns: 2;
        column-gap: 50px;
    }
`


let renderSlice = (slice) => {
      switch(slice._type) {
          case 'video':
          return <SliceWrapper key={slice._id}><Video data={slice.video}/></SliceWrapper>
          case 'image':
          return <SliceWrapper key={slice._id}><Image data={slice} /></SliceWrapper>
          case 'Text':
          return <SliceWrapper key={slice._id} className={slice.doubleColumn ? "double-col" : ""}><Body content={slice.text} /></SliceWrapper>;
      }
}


let scrollTriggerInstance = null;

export default function Component({ data, menuData }) {
    let menuRef = useRef();

    let init = (reset) => {

        if(reset === true) {
          if(scrollTriggerInstance !== null) {
              ScrollTrigger.getById("scroll-trigger").kill(true);
          }
        }
    
        if(window.innerWidth > 989) {
    
            scrollTriggerInstance = ScrollTrigger.create({
                trigger: menuRef.current,
                id: "scroll-trigger",
                pin: menuRef.current,
                start: "top-=50 top",
                end: "max",
                pinSpacing: false
            });
    
        } 
    }

    let initWrapper = () => {
        init(true)
    }

    useEffect(() => {


        if(window.innerWidth > 989) {
            init();
        }

        window.addEventListener("resize", initWrapper)

        return () => {
            window.removeEventListener("resize", initWrapper)
        }        
        

    }, []);

  return (
    <Container>
      <ColLeft>
        <div ref={menuRef}>
            <Menu data={menuData} />
        </div>
      </ColLeft>
      <ColRight>
        {data.slices?.map(slice => renderSlice(slice))}
      </ColRight>
    </Container>
  )
}
