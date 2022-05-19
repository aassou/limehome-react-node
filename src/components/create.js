import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
    const [form, setForm] = useState({
        checkin: "",
        checkout: "",
        guestNumber: "",
        firstname: "",
        lastname: "",
        billingAddress: "",
        billingCountry: "",
        postalCode: "",
        city: "",
        email: "",
        phoneNumber: "",
    });
    const navigate = useNavigate();
 
    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
 
    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
 
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newReservation = { ...form };
    
        await fetch("http://localhost:5000/reservation/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newReservation),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
    
        setForm({
            checkin: "",
            checkout: "",
            guestNumber: "",
            firstname: "",
            lastname: "",
            billingAddress: "",
            billingCountry: "",
            postalCode: "",
            city: "",
            email: "",
            phoneNumber: "", 
        });
        navigate("/");
    }
 
    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="checkin">Check-in</label>
                    <input
                        type="text"
                        className="form-control"
                        id="checkin"
                        value={form.checkin}
                        onChange={(e) => updateForm({ checkin: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="checkout">Check-out</label>
                    <input
                        type="text"
                        className="form-control"
                        id="checkout"
                        value={form.checkout}
                        onChange={(e) => updateForm({ checkout: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="guestNumber">Number of Guests</label>
                    <input
                        type="text"
                        className="form-control"
                        id="guestNumber"
                        value={form.guestNumber}
                        onChange={(e) => updateForm({ guestNumber: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={form.firstname}
                        onChange={(e) => updateForm({ firstname: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={form.lastname}
                        onChange={(e) => updateForm({ lastname: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="billinAddress">Billing Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="billinAddress"
                        value={form.billinAddress}
                        onChange={(e) => updateForm({ billinAddress: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="billinCountry">Billing Country</label>
                    <input
                        type="text"
                        className="form-control"
                        id="billinCountry"
                        value={form.billinCountry}
                        onChange={(e) => updateForm({ billinCountry: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="postalCode"
                        value={form.postalCode}
                        onChange={(e) => updateForm({ postalCode: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={form.city}
                        onChange={(e) => updateForm({ city: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        value={form.phoneNumber}
                        onChange={(e) => updateForm({ phoneNumber: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}