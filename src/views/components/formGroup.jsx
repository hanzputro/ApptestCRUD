import React, { Component } from "react";

class formGroup extends Component {
  render() {
    if (this.props.error) {
      return <div>Error: {this.props.error.message}</div>;
    } else if (!this.props.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <form className="row p-1 mb-4" key={this.props.myData.id}>
            <div className="col-4 p-1">
              <img
                className="w-100"
                src={this.props.myData.photo}
                alt="Photo Profile"
              />
            </div>
            <div className="col-4 p-1">
              <div className="input-group mb-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  name="firstname"
                  defaultValue={this.props.myData.firstName}
                  onChange={e => this.props.onChange(e, this.props.myData.id)}
                />
              </div>
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  placeholder="Upload http://"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  name="photo"
                  defaultValue={this.props.myData.photo}
                  onChange={e => this.props.onChange(e, this.props.myData.id)}
                />
              </div>
            </div>
            <div className="col-4 p-1">
              <div className="input-group mb-2">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  name="lastname"
                  defaultValue={this.props.myData.lastName}
                  onChange={e => this.props.onChange(e, this.props.myData.id)}
                />
              </div>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Age"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  name="age"
                  defaultValue={this.props.myData.age}
                  onChange={e => this.props.onChange(e, this.props.myData.id)}
                />
              </div>
            </div>
            <div className="col-12 p-1 text-right">
              <button
                className="btn btn-secondary btn-sm mr-2"
                onClick={e => this.props.onSubmit(e, this.props.myData.id)}
              >
                EDIT
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={e => this.props.onDelete(e, this.props.myData.id)}
              >
                DELETE
              </button>
            </div>
          </form>
        </React.Fragment>
      );
    }
  }
}

export default formGroup;
