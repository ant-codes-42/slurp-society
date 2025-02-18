import { useParams, useSearchParams } from "react-router";
import ReservationForm from "../components/ReservationForm";

import ErrorPage from "./ErrorPage";

const CreateReservation = () => {
    const { slotId } = useParams();
    const [searchParams] = useSearchParams();
    const partySize = searchParams.get('partySize') || '2'; //might need to wrap with Number()

    if (!slotId) {
        return <ErrorPage />;
    }

    return (
        <div>
        <h1>Create Reservation</h1>
        <ReservationForm slot={slotId} incomingPartySize={partySize}/>
        </div>
    );
    }

export default CreateReservation;