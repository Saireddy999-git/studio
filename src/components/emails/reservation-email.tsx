import * as React from 'react';

interface ReservationEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ReservationEmail: React.FC<Readonly<ReservationEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <h1>New Reservation Request</h1>
    <p>
      You have received a new reservation request from <strong>{name}</strong>.
    </p>
    <h2>Details:</h2>
    <ul>
      <li>
        <strong>Name:</strong> {name}
      </li>
      <li>
        <strong>Email:</strong> {email}
      </li>
      <li>
        <strong>Message:</strong>
        <br />
        {message}
      </li>
    </ul>
  </div>
);
