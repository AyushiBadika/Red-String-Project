import { useEffect, useState } from "react";

import { Navigation } from "swiper/modules";

import EventItem from "../components/EventItem";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/event/get`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 pt-20 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Discover and Share <span className="text-slate-500"> Events </span>Around You!
        </h1>
        <div className="text-gray-400 text-lg ">Explore upcoming events or post your own. Join the fun, connect with others, and never miss out on exciting experiences!</div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {events && events.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">All Events</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {events.map((event) => (
                <EventItem event={event} key={event._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
