import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config(); // loads enviroment variables from .env

//initialize Resend API
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string) => {
    try {

        await resend.emails.send({
            from: 'Slurp-Society@resend.dev',
            to: email, // recipient email
            subject: 'Registration Complete!',
            html: `
            <p> Thank you for you're registration at Slurp Society!</p>
            <p> We're excited to do business with you.  Please login with your email & password on our website. </p>
            <p> We'll be seeing you soon! </p>
            `
        });
        console.log(`Welcome email sent to ${email}`);
    } catch (err) {
        console.error('Failed to send welcome email:', err);
        throw new Error('Could not send welcome email');
    }

}


export const sendReservationConfirmation = async (email: string, _name: string) => {
    try {
        await resend.emails.send ({
            from: 'Slurp-Society@resend.dev',
            to: email,
            subject: 'Reservation Confirmation - Slurp Society',
            html: `
            <p> Dear ${email}, </p>
            <p> Thank you for making your reservation with Slurp Society! </p>
            <p> We look forward to seeing you! </p>
            <p> Regards, Slurp Society Team</p>`
        });
        console.log(`Confirmation Email sent to ${email}`);
    } catch (err) {
        console.error('Failed to send reservation confirmation email:', err);
        throw new Error('Could not send reservation confirmation email');
    }

};

