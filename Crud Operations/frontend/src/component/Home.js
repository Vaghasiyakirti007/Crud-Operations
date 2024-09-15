import React from 'react'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            PN: '',
            C: '',
            nm: '',
            pass: '',
            index: 0,
            allDataArr: [],
            isEditRecord: false,
            isError: false,
        }
    }

    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //call this function when page refresh
    componentDidMount() {
        this.home()
    }

    home = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:1000/api/page", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({
                    allDataArr: result.data
                });
            })
            .catch(error => console.log('error', error));
    }

    submitdata = () => {

        if (!this.state.email || !this.state.pass) {
            alert("All Fild Are Required !")
            return;
        }

        let E = validateEmail(this.state.email)
        if (E == false) {
            alert("Enter A Valid Email !")
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": this.state.email,
            "pass": this.state.pass,
            "PN": this.state.PN,
            "C": this.state.C,
            "nm": this.state.nm
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:1000/api/Seen", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    allDataArr: result.data,
                    email: '',
                    pass: '',
                    isEditRecord: false
                });
            })
            .catch(error => console.log('error', error));

        this.setState({
            email: '',
            pass: '',
            PN: '',
            C: '',
            nm: ''
        })

        alert("Data Send Successfully !");
    }


    fillInput = (obj) => {
        this.setState({
            isEditRecord: true,
            email: obj.email,
            nm: obj.nm,
            PN: obj.PN,
            C: obj.C,
            _id: obj._id,
            pass: obj.pass,
            index: obj.index
        });
    }

    UpdateData = () => {

        // let allData = JSON.parse(localStorage.getItem('dataArray'));
        // allData.filter((data, i) => {
        //     if (i == this.state.index) {
        //         data.email = this.state.email;
        //         data.pass = this.state.pass;
        //     }
        // });

        // localStorage.setItem('dataArray', JSON.stringify(allData));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "_id": this.state._id,
            "email": this.state.email,
            "pass": this.state.pass,
            "PN": this.state.PN,
            "C": this.state.C,
            "nm": this.state.nm
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:1000/api/update", requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    allDataArr: result.data,
                    email: '',
                    pass: '',
                    PN: '',
                    C: '',
                    nm: '',
                    isEditRecord: false
                });
            })
            .catch(error => console.log('error', error));

    }


    deletline = (_id) => {

        // let fulldata = JSON.parse(localStorage.getItem('dataArray'));
        // let totalvar = fulldata.filter((x, i) => {
        //     return i !== zz.index;
        // });
        // localStorage.setItem('dataArray', JSON.stringify(totalvar));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:1000/api/delete?_id=" + _id, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({ allDataArr: result.data })
            })
            .catch(error => console.log('error', error));
    }
    // this.setState({ allDataArr: TOTALVAR ===== aani jagiya ae RESULT.DATA and uper Json })

    render() {
        console.log(this.state);
        return (


            <div className='container' >
                <br />
                <div>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name="nm" value={this.state.nm} className="form-control" onChange={(e) => this.handlechange(e)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" name="email" value={this.state.email} className="form-control" onChange={(e) => this.handlechange(e)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input type="text" name="PN" value={this.state.PN} className="form-control" onChange={(e) => this.handlechange(e)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">City</label>
                        <input type="text" name="C" value={this.state.C} className="form-control" onChange={(e) => this.handlechange(e)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="number" name="pass" value={this.state.pass} className="form-control" onChange={(e) => this.handlechange(e)} id="exampleInputPassword1" />
                    </div>


                    {this.state.isEditRecord == false ?
                        <button type="button" className="btn btn-primary" onClick={() => this.submitdata()}>Submit</button>
                        : <button type="button" onClick={() => this.UpdateData()} className="btn btn-warning">Update</button>}


                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">S.NO.!</th>
                            <th scope="col">Name</th>
                            <th scope="col">E-MAIL.!</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">City</th>
                            <th scope="col">PASSWORD.!</th>
                            <th scope="col">ACTION.!</th>
                            <th scope="col">ACTION.!</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.allDataArr && this.state.allDataArr.length > 0 ?
                                this.state.allDataArr.map((x, i) => {

                                    // or // 
                                    // allArrayData && allArrayData.length > 0 ?
                                    //     allArrayData.map((x, i) => {

                                    x['index'] = i;
                                    return <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{x.nm}</td>
                                        <td>{x.email}</td>
                                        <td>{x.PN}</td>
                                        <td>{x.C}</td>
                                        <td>{x.pass}</td>
                                        <td><button type="button"
                                            onClick={() => this.fillInput(x)}
                                            class="btn btn-primary">UPDATE</button></td>
                                        <td><button type="button"
                                            onClick={() => this.deletline(x._id)}
                                            class="btn btn-danger">DELET</button></td>
                                    </tr>
                                })
                                :
                                'No Record Found'
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default Home