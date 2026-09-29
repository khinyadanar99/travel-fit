import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function DateTimeFields({departure, setDeparture, arrival, setArrival, arrivalError, departureError}) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DesktopDatePicker
                label="Start Date"
                value={departure}
                onChange={(value) => {
                    setDeparture(value ? value.startOf("day") : null);
                }}
                slotProps={{
                    textField: {
                        error: Boolean(departureError),
                        helperText: departureError,
                    },
                }}
                minDate={dayjs()}
                maxDate={dayjs().add(16, "day")}
            />

            <DesktopDatePicker
                label="End Date"
                value={arrival}
                onChange={(value) => {
                    setArrival(value ? value.endOf("day") : null);
                }}
                slotProps={{
                    textField: {
                        error: Boolean(arrivalError),
                        helperText: arrivalError,
                    },
                }}
                minDate={dayjs()}
                maxDate={dayjs().add(16, "day")}
            />
        </div>
    );
}