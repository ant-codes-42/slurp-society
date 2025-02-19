import {Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config(); // loads enviroment variables from .env

//initialize Resend API
const resend = new Resend(process.env.RESEND_API_KEY);


export const sendReservationConfirmation = async (email: string, name: string, date: string, time: string, partySize: number) => {
    try {
        await resend.emails.send ({
            from: 'Slurp-Society@resend.dev',
            to: email,
            subject: 'Reservation Confirmation - Slurp Society',
            html: `
            <p> Dear ${name}, </p>
            <p> Thank you for making your reservation with Slurp Society! </p>
            <p> Here are the details to your reservation: </p>
            <ul>
                <li> Date: ${date}</li>
                <li> Time: ${time}</li>
                <li> Party Size: ${partySize} </li>
            </ul>
            <p> We look forward to seeing you! </p>
            <p> Regards, Slurp Society Team</p>`
        });
        console.log(`Confirmation Email sent to ${email}`);
    } catch (err) {
        console.error('Failed to send reservation confirmation email:', err);
        throw new Error('Could not send reservation confirmation email');
    }

};