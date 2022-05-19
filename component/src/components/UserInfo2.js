
import React, { Component } from 'react'

export default class UserInfo2 extends Component {
  render() {
    return (
        <div className="user">
        <img
          className="user__avatar"
          src={this.props.userData?.data?.avatar_url}
          alt="Avatar"
        />
        <div className="user__info">
          <p>Name: {this.props.userData?.data?.login}</p>
          <hr />
          <p>Roll: {this.props.userData?.data?.type}</p>
          <hr />
          <p>
            Email:{" "}
            {this.props.userData?.data?.email !== null
              ? `${this.props.userData?.data?.email}`
              : "none"}
          </p>
          <hr />
          <p>
            Company:{" "}
            {this.props.userData?.data?.company !== null
              ? `${this.props.userData?.data?.company}`
              : "none"}
          </p>
          <hr />
          <p>Number of follower: {this.props.userData?.data?.followers}</p>
        </div>
      </div>
    )
  }
}
