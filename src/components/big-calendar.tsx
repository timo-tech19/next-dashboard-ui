"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { calendarEvents } from "@/lib/data";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  //   const handleOnChangeView = (selectedView: View) => {
  //     setView(selectedView);
  //   };

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={setView}
      min={new Date(2024, 11, 3, 8, 0, 0)}
      max={new Date(2024, 11, 3, 17, 0, 0)}
    />
  );
};

export default BigCalendar;
