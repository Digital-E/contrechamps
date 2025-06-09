import { useEffect, useRef } from "react";

import styled from "styled-components"

import Slices from "./l-ensemble-slices"

import Menu from "./l-ensemble-menu"

import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-top: 100px;

  &&.force-font-courier p {
    font-family: "Courier";
  }
  
  @media(max-width: 767px) {
    flex-wrap: wrap;
    margin-top: 20px;
  }
`

const ColLeft = styled.div`
  flex-basis: 30%;

  > div *:nth-child(1) {
    margin-top: 0px !important;
  }

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


let scrollTriggerInstance = null;

export default function Component({ data, menuData, slug }) {
    let menuRef = useRef();

    let init = (reset) => {

        if(reset === true) {
          if(scrollTriggerInstance !== null) {
              ScrollTrigger.getById("scroll-trigger")?.kill(true);
          }
        }
    
        if(window.innerWidth > 989) {
    
            scrollTriggerInstance = ScrollTrigger.create({
                trigger: menuRef.current,
                id: "scroll-trigger",
                pin: menuRef.current,
                start: `top-=120 top`,
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

    useEffect(() => {
      if(window.innerWidth > 989) {
          initWrapper();
      }
    })

  return (
    <Container className={slug === "infos-pratiques" && "force-font-courier"}>
      <ColLeft>
        <div ref={menuRef}>
            <Menu data={menuData} />
        </div>
      </ColLeft>
      <ColRight>
        <Slices data={data.slices} />
      </ColRight>
    </Container>
  )
}
