import React from 'react'
import styled from 'styled-components'

function Home() {
  return (
    <Container>
      <div>Home Service not Available! &#128521;</div>
    </Container>
  )
}
const Container = styled.div`
    div{
    color: white;
    margin:10% auto;
     display: flex;
    font-size: 3rem;
    align-items: center;
    justify-content: center;
  }
`
export default Home

