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
    margin-top: 20px;
    flex-wrap: wrap;
  }

`

const ColLeft = styled.div`
  flex-basis: 30%;

  @media(max-width: 767px) {
    flex-basis: 50%;
    margin-bottom: 50px;
  }
`

const ColMiddle = styled.div`
  flex-basis: 30%;
  padding: 0 20px;

  @media(max-width: 767px) {
    flex-basis: 50%;
  }
`

const ColRight = styled.div`
  flex-basis: 70%;

  @media(min-width: 768px) {
    > div *:nth-child(1) {
      margin-top: 0px !important;
    }
  }

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

    @media(min-width: 990px) {
      &&.image-slice {
          width: 50%;
      }
    }
`


let renderSlice = (slice) => {
      switch(slice._type) {
          case 'video':
          return <SliceWrapper key={slice._id}><Video data={slice.video}/></SliceWrapper>
          case 'image':
          return <SliceWrapper key={slice._id} className="image-slice"><Image data={slice}  hasCaption={true}/></SliceWrapper>
          case 'Text':
          return <SliceWrapper key={slice._id} className={slice.doubleColumn ? "double-col" : ""}><Body content={slice.text} /></SliceWrapper>;
      }
}


let scrollTriggerInstance = null;

let scrollTriggerInstanceTwo = null;

export default function Component({ data, menuData, menuTwoData, isSubSubPage }) {
    let menuRef = useRef();
    let menuRefTwo = useRef();

    let init = (reset) => {

        if(reset === true) {
          if(scrollTriggerInstance !== null) {
              ScrollTrigger.getById("scroll-trigger")?.kill(true);
          }

          if(scrollTriggerInstanceTwo !== null && scrollTriggerInstanceTwo !== undefined) {
            ScrollTrigger.getById("scroll-trigger-two")?.kill(true);
        }
        }
    
        if(window.innerWidth > 767) {

          let headerHeight = document.querySelector("header").offsetHeight;
    
            scrollTriggerInstance = ScrollTrigger.create({
                trigger: menuRef.current,
                id: "scroll-trigger",
                pin: menuRef.current,
                start: `top-=120 top`,
                end: document.querySelector("body").scrollHeight - menuRef.current.offsetHeight - document.querySelector("footer").offsetHeight - 65,
                pinSpacing: false
            });

            scrollTriggerInstanceTwo = ScrollTrigger.create({
                trigger: menuRefTwo.current,
                id: "scroll-trigger-two",
                pin: menuRefTwo.current,
                start: `top-=120 top`,
                end: document.querySelector("body").scrollHeight - menuRefTwo.current.offsetHeight - document.querySelector("footer").offsetHeight - 65,
                pinSpacing: false
            });           
    
        } 
    }

    let initWrapper = () => {
        init(true)
    }

    useEffect(() => {


        if(window.innerWidth > 767) {
            init();
        }

        window.addEventListener("resize", initWrapper)

        return () => {
            window.removeEventListener("resize", initWrapper)
        }        
        

    }, []);

    useEffect(() => {
      if(window.innerWidth > 989) {
          initWrapper();
      }
    })

  return (
    <Container>
      <ColLeft>
        <div ref={menuRef}>
            <Menu data={menuData} isSubSubPage={isSubSubPage} />
        </div>
      </ColLeft>
      <ColMiddle>
        <div ref={menuRefTwo}>
            <Menu data={menuTwoData} />
        </div>
      </ColMiddle>
      <ColRight>
        {data?.slices.map(slice => renderSlice(slice))}
      </ColRight>
    </Container>
  )
}
