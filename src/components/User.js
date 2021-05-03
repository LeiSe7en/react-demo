import React from 'react'
import Proptypes from 'prop-types'
import { Card } from 'antd'

const { Meta } = Card

const User = (props) => {
  const { name, picture, email, isLoading } = props
  const desc = (
    <div className="description">
      <p>email: {email}</p>
    </div>
  )
  return (
    <Card
      hoverable
      loading={isLoading}
      style={{ width: 240 }}
      cover={<img alt="me" src={picture.large} />}
    >
      <Meta title={`${name.title} ${name.first} ${name.last}`} description={desc} />
    </Card>
  )
}

User.propTypes = {
  name: Proptypes.string,
  picture: Proptypes.string,
  email: Proptypes.string,
  isLoading: Proptypes.bool
}

export default User
