import dayjs from "dayjs";
import 'dayjs/locale/en-gb';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function DateTimeFields({departure, setDeparture, arrival, setArrival, arrivalError, departureError}) {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'> 
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
                    maxDate={dayjs().add(15, "day")}
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
                    maxDate={dayjs().add(15, "day")}
                />
            </div>
        </LocalizationProvider>
    );
}