import React, { Component } from "react";
import FormGroup from "../views/components/formGroup";
import "../styles/styles.scss";

class home extends Component {
  state = {
    error: null,
    isLoaded: true,
    myData: [
      {
        id: null,
        firstName: "",
        lastName: "",
        age: 0,
        photo: ""
      }
    ],
    status: null
  };

  componentDidMount() {
    fetch("https://simple-contact-crud.herokuapp.com/contact")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            myData: result.data,
            status: result.message
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleInputChange = (event, Id) => {
    this.setState({ id: Id, [event.target.name]: event.target.value });
  };

  handleUpdate = (event, Id) => {
    event.preventDefault();
    // alert("Update Success!");
    let myData = [...this.state.myData];
    let index = myData.findIndex(myData => myData.id === this.state.id);
    myData[index] = {
      id: this.state.id,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      age: this.state.age,
      photo: this.state.photo
    };
    // this.setState(prevState => ({ myData }));
    fetch("https://simple-contact-crud.herokuapp.com/contact/" + Id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      id: JSON.stringify(Id),
      body: JSON.stringify(myData)
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState(prevState => ({ myData }));
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  handleAdd = event => {
    // event.preventDefault();
    // const uuidv4 = require("uuid/v4");
    // const uniqueId = uuidv4();

    let myData = [...this.state.myData];
    myData[this.state.myData.length++] = {
      // id: uniqueId,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      age: this.state.age,
      photo: this.state.photo
    };
    // this.setState(prevState => ({ myData }));
    fetch("https://simple-contact-crud.herokuapp.com/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        age: this.state.age,
        photo: this.state.photo
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({ myData });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  handleDelete = (event, Id) => {
    event.preventDefault();
    return fetch("https://simple-contact-crud.herokuapp.com/contact/" + Id, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      id: JSON.stringify({ Id })
    })
      .then(res => res.json())
      .then(
        result => {
          const myData = this.state.myData.filter(d => d.id !== Id);
          this.setState({ myData });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container w-50 pt-4">
          {this.state.myData.map(myData => (
            <FormGroup
              key={myData.id}
              status={this.state.status}
              error={this.state.error}
              myData={myData}
              isLoaded={this.state.isLoaded}
              onDelete={this.handleDelete}
              onChange={this.handleInputChange}
              onSubmit={this.handleUpdate}
            />
          ))}

          <hr />
          <form
            className="row rounded p-1 mb-2"
            style={{ background: "#eee" }}
            onSubmit={this.handleAdd}
          >
            <div className="col-6 p-1">
              <div className="input-group mb-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  name="firstname"
                  onChange={this.handleInputChange}
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
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="col-6 p-1">
              <div className="input-group mb-2">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  name="lastname"
                  onChange={this.handleInputChange}
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
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 p-1 text-right">
              <input
                type="submit"
                className="btn btn-primary btn-sm"
                value="ADD"
              />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default home;
