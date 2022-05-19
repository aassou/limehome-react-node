import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Reservation = (props) => (
    <tr>
        <td>{props.reservation.checkin}</td>
        <td>{props.reservation.checkout}</td>
        <td>{props.reservation.guestNumber}</td>
        <td>{props.reservation.firstname}</td>
        <td>{props.reservation.lastname}</td>
        <td>{props.reservation.billingAddress}</td>
        <td>{props.reservation.billingCountry}</td>
        <td>{props.reservation.postalCode}</td>
        <td>{props.reservation.city}</td>
        <td>{props.reservation.email}</td>
        <td>{props.reservation.phoneNumber}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.reservation._id}`}>Edit</Link> |
            <button className="btn btn-link"
                onClick={() => {
                props.deleteReservation(props.reservation._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    // This method fetches the reservations from the database.
    useEffect(async () => {
        const response = await fetch(`http://127.0.0.1:5000/reservation`);
        
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const reservationsArray = await response.json();
        setReservations(reservationsArray);

        return;
    }, []);

    // This method will delete a reservation
    async function deleteReservation(id) {
        await fetch(`http://localhost:5000/reservation/${id}`, {
            method: "DELETE"
        });

        const newReservations = reservations.filter((el) => el._id !== id);
        setReservations(newReservations);
    }

    // This method will map out the reservations on the table
    function reservationList() {
        return reservations.map((reservation) => {
            return (
                <Reservation
                    reservation={reservation}
                    deleteReservation={() => deleteReservation(reservation._id)}
                    key={reservation._id}
                />
            );
        });
    }

    // This following section will display the table with the reservations of individuals.
    return (
        <div>
            <h3>Reservation List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Check-in/out</th>
                        <th>Number of Guests</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Billing Address</th>
                        <th>Billing Country</th>
                        <th>Postal Code</th>
                        <th>City</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{reservationList()}</tbody>
            </table>
        </div>
    );
}

export default ReservationList;