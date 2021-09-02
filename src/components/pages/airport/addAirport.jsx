import React, { useState } from 'react';
import AirportService from '../../../services/AirportService';

import { Alert } from '@material-ui/lab';

const style = {
    backgroundColor: "#fff",
    width: 450
}

const AddAirport = (props) => {

    const [airportDetails, setAirportDetails] = React.useState({
        airportCode: '',
        airportLocation: '',
        airportName: ''
    })

    // const [errors, setErrors] = useState();

    const [created, setCreated] = useState();

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setAirportDetails(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //Checking if there are errors

        // const errors = validate();
        // setErrors(errors);
        // console.log(errors);
        // //If errors exists then don't dispatch the action
        // if (errors)
        //     return;

        AirportService.createAirport(airportDetails)
            .then((response) => {
                console.log(response.data)
                if (response.data) {
                    setCreated({
                        hasCreated: true,
                        message: "Airport added successfully."
                    })
                }
            })
            .catch(err => {
                if (err.response.data) {
                    setCreated({
                        hasCreated: false,
                        message: "Something went wrong!"
                    })
                }
            })
    }

    //Schema for form field validation
    // const schema = Joi.object({
    //     aiportCode: Joi.string().required(),
    //     airportLocation: Joi.string().required(),
    //     aiportName: Joi.string().required()
    // })

    //Now writing a separate validate function which would be called later.
    // const validate = () => {

    //     //Creating errors object, which would be returned
    //     const errors = {}

    //     const result = schema.validate(airportDetails, {
    //         abortEarly: false
    //     })

    //     //console.log(result);

    //     //Populating the errors object if errors exists.
    //     if (result.error != null) {
    //         for (let error of result.error.details) {
    //             errors[error.path[0]] = error.message
    //         }
    //     }

    //     return Object.keys(errors).length === 0 ? null : errors
    // }

    console.log(airportDetails);
    return (
        <div className="container mx-auto my-5 p-4 border-top-0 rounded" style={style}>

            <h2 className="text-center">Add Airport</h2>
            {created ? (
                created.hasCreated ? <Alert severity="success">{created.message}</Alert>
                    : <Alert severity="error">{created.message}</Alert>
            ) : null
            }
            <form className="text-start" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label for="airportCode" className="form-label">Airport Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="airportCode"
                        name="airportCode"
                        value={airportDetails.airportCode}
                        onChange={handleChange}
                    />

                    {/* {errors && (
                        <p className="text-danger text-start">
                            {errors.airportCode}
                        </p>
                    )} */}

                </div>

                <div className="mb-3">
                    <label for="airportLocation" className="form-label">Airport Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="airportLocation"
                        name="airportLocation"
                        value={airportDetails.airportLocation}
                        onChange={handleChange}
                    />

                    {/* {errors && (
                        <p className="text-danger text-start">
                            {errors.airportLocation}
                        </p>
                    )} */}

                </div>

                <div className="mb-3">
                    <label for="airportName" className="form-label">Airport Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="airportName"
                        name="airportName"
                        value={airportDetails.airportName}
                        onChange={handleChange}
                    />

                    {/* {errors && (
                        <p className="text-danger text-start">
                            {errors.airportName}
                        </p>
                    )} */}

                </div>

                <button type="submit" className="btn btn-primary">Add Airport</button>

            </form>

        </div>
    )
}

export default AddAirport;