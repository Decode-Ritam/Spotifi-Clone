import React from 'react'
import styled from 'styled-components'

function Progressbar() {
  return (
    <Container >

      <div className="progress"></div>

    </Container>
  )
}
const Container = styled.div`
 .progress{
    width: 0%;
    transition: 2s;
    height: 100%;
    background-color: #01ff01;
}
`
export default Progressbar