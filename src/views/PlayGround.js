import * as React from 'react'
import UsedmemoComponent from '../components/UsedMemoComponent'
import NormalComponent from '../components/NormalComponent'

function PlayGround (props) {
  console.log('dsdsdsdsds')
  const [ message, setMessage ] = React.useState(1)
  const [ objState, setObjectState ] = React.useState({})

  function mutateMessage () {
    setMessage(message+1)
  }

  function mutateObject () {
    setObjectState({
      name: 'Nelson'
    })
  }

  return (
    <div>
      <button onClick={mutateMessage}>Change message</button>
      <button onClick={mutateObject}>Change Object Value</button>
      <UsedmemoComponent/>
      <NormalComponent obj={objState}/>
    </div>
  )
}

export default PlayGround