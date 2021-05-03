import React from 'react'

function UsedMemoComponent (props) {
  console.log('UsedMemoComponent render')
  return (
    <div>
      <h2>Hello, I'm the component return by React.memo</h2>
      <h3>This is the message from props { props.message }</h3>
    </div>
  )
}

export default React.memo(UsedMemoComponent)
