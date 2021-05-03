import React from 'react'

function NormalComponent (props) {
  console.log('NormalComponent render')
  return (
    <div>
      <h2>Hello, I'm the component return by React.memo</h2>
      <h3>This is the message from props { props.message }</h3>
      <h3>Test mutate object of state { props.obj.name }</h3>
    </div>
  )
}

export default NormalComponent
