import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";

export default function Event() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/event/get/${params.eventId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setEvent(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [params.eventId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl">Something went wrong!</p>}
      {event && !loading && !error && (
        <div>
          <img src={event.poster} alt="" className="object-cover w-full h-96" />
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">Link copied!</p>}

          <div className="px-10">
            <p className="text-2xl font-semibold mt-4">{event.title}</p>
            <p className="text-xl ">{event.description}</p>
            <p className=" ">Date : {event.date.slice(0, 10)}</p>
            <p className=" ">Mode : {event.mode}</p>
          </div>
        </div>
      )}
    </main>
  );
}
