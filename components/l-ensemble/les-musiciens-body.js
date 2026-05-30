import { useEffect, useRef } from "react";

import styled from "styled-components"

import Slices from "./l-ensemble-slices"

import NestedMenu from "../nested-menu"

import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  margin-top: 100px;

  @media(max-width: 1200px) {
    flex-wrap: wrap;
  }

  @media(max-width: 767px) {
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 0 20px;
  }
`

const ColLeft = styled.div`
  flex-basis: 20%;
  padding-right: 40px;

  > div *:nth-child(1) {
    margin-top: 0px !important;
  }

  @media(max-width: 767px) {
    flex-basis: 100%;
    margin-bottom: 50px;
    order: 4;
  }
`

const ColMiddle = styled.div`
  flex-basis: 40%;
  padding-right: 80px;

  @media(max-width: 1200px) {
    flex: 1;
    padding-right: 0;
  }

  @media(max-width: 767px) {
    flex-basis: 100%;
    order: 1;
    padding: 0;
  }
`

const ColRight = styled.div`
  flex-basis: 40%;

  @media(max-width: 1200px) {
    flex-basis: 80%;
    margin-left: 20%;
  }

  @media(max-width: 767px) {
    flex-basis: 100%;
    margin-left: 0;
    width: calc(100vw - 40px);
    overflow: hidden;
    order: 3;
  }
`


let scrollTriggerInstance = null;

export default function Component({ data, mainMenuData, slug }) {
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
    <Container>
      <ColLeft>
        <div ref={menuRef}>
            <NestedMenu items={(() => {
                const nested = mainMenuData?.menuItems?.filter(item => item.subItems?.length > 0) ?? []
                return nested.length > 0 ? [...nested[0].subItems, ...nested.slice(1)] : []
            })()} />
        </div>
      </ColLeft>
      <ColMiddle>
        <Slices data={data?.slices} />
      </ColMiddle>
      <ColRight>
        <Slices data={data?.slicesRight} />
      </ColRight>
    </Container>
  )
}
