import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/en-gb";
import type { Dispatch, SetStateAction } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateTimeFieldsProps {
  departure: Dayjs | null;
  setDeparture: Dispatch<SetStateAction<Dayjs | null>>;
  arrival: Dayjs | null;
  setArrival: Dispatch<SetStateAction<Dayjs | null>>;
  arrivalError: string;
  departureError: string;
}

export default function DateTimeFields({
    departure,
    setDeparture,
    arrival,
    setArrival,
    arrivalError,
    departureError,
}: DateTimeFieldsProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
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
