import { Dropdown } from "../ui/Dropdown";
import { useEffect, useRef } from "react";

interface Props {
  isFormSubmitted?: boolean;
  onChange?: (time: string) => void;
  placeholder?: string;
}

export const TimeSelector = ({
  isFormSubmitted,
  onChange,
  placeholder,
}: Props) => {
  //Lists for dropdown
  let hourList = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  let minuteList = Array.from({ length: 59 }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  );
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const meridianRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hourRef.current && minuteRef.current && meridianRef.current) {
      const hourInput = hourRef.current.value;
      const minuteInput = minuteRef.current.value;
      const meridianInput = meridianRef.current.value;
      if (hourInput !== "" && minuteInput !== "" && meridianInput !== "") {
        const timeInput = `${hourInput}:${minuteInput} ${meridianInput}`;
        if (onChange) {
          onChange(timeInput);
        }
      }
    }
  }, [isFormSubmitted]);

  const sharedStyling =
    "border-2 w-full focus:outline-none p-2 duration-300 ease-in-out";
  return (
    <div className="flex items-center">
      <Dropdown
        ref={hourRef}
        className={`rounded-r-none ${sharedStyling} min-x-20 max-w-24 text-center`}
        items={hourList}
        min="1"
        isFormSubmitted={isFormSubmitted}
        readOnly={true}
      />
      <h1 className="mx-2 text-xl">:</h1>
      <Dropdown
        ref={minuteRef}
        className={`rounded-none ${sharedStyling} min-x-20 max-w-24 text-center`}
        items={minuteList}
        min="1"
        isFormSubmitted={isFormSubmitted}
        readOnly={true}
      />
      <Dropdown
        ref={meridianRef}
        className={`rounded-l-none ${sharedStyling} min-x-20 max-w-24 text-center`}
        items={["AM", "PM"]}
        min="1"
        isFormSubmitted={isFormSubmitted}
        placeholder={placeholder}
        readOnly={true}
      />
    </div>
  );
};
