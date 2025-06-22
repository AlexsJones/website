import { speakingEvents } from "./events";

export default function SpeakingPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Speaking Events</h1>
      <a
        href="https://www.youtube.com/cloudnativeskunkworks"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mb-6 text-red-600 hover:underline font-semibold"
      >
        Visit my YouTube channel: Cloud Native Skunkworks
      </a>
      <ul className="space-y-6">
        {speakingEvents.map((event, idx) => (
          <li key={idx} className="border-l-4 border-blue-600 pl-4">
            <div className="font-semibold text-lg">{event.title}</div>
            <div className="text-gray-700">{event.event} &mdash; {event.date} &mdash; {event.location}</div>
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              More info
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
} 