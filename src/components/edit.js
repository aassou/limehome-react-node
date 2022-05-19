import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();
 
    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/reservation/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Reservation with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);
 
    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
 
    async function onSubmit(e) {
        e.preventDefault();
        const editedReservation = {
            checkin: form.checkin,
            checkout: form.checkout,
            guestNumber: form.guestNumber,
            firstname: form.firstname,
            lastname: form.lastname,
            billingAddress: form.billingAddress,
            billingCountry: form.billingCountry,
            postalCode: form.postalCode,
            city: form.city,
            email: form.email,
            phoneNumber: form.phoneNumber,
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/resrevation/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedReservation),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/");
    }
 
    // This following section will display the form that takes input from the user to update the data.
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