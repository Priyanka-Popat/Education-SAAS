import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";

export default function EventForm() {
  const [eventTopic, setEventTopic] = useState("");
  const [startDate, setStartDate] = useState("May 23, 2025");
  const [startTime, setStartTime] = useState("1:00 AM");
  const [frequency, setFrequency] = useState("Does not repeat");
  const [description, setDescription] = useState("");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);

  const timeOptions = [
    "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM",
    "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM",
    "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM",
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM",
    "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
  ];

  const frequencyOptions = [
    "Does not repeat",
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly"
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="flex-1 h-1 bg-gray-500 rounded-full"></div>
          <div className="flex-1 h-1 bg-blue-500 rounded-full mx-2"></div>
          <div className="flex-1 h-1 bg-gray-500 rounded-full"></div>
        </div>

        <div className="flex justify-between mb-8 text-sm">
          <span className="text-gray-400">Location</span>
          <span className="text-blue-400 font-medium">Event Info</span>
          <span className="text-gray-400">Review</span>
        </div>

        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">What's your event about?</h2>
            <p className="text-gray-400">Fill out the details of your event.</p>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Event Topic <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="What's your event?"
              value={eventTopic}
              onChange={(e) => setEventTopic(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-white text-sm font-medium mb-2">
                Start Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {startTime}
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                {showTimeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg max-h-40 overflow-y-auto z-10">
                    {timeOptions.map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setStartTime(time);
                          setShowTimeDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2">
              Event Frequency <span className="text-red-500">*</span>
            </label>
            <button
              onClick={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {frequency}
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
            {showFrequencyDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg z-10">
                {frequencyOptions.map((freq) => (
                  <button
                    key={freq}
                    onClick={() => {
                      setFrequency(freq);
                      setShowFrequencyDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  >
                    {freq}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Description
            </label>
            <div className="relative">
              <textarea
                placeholder="Tell people a little more about your event. Markdown, new lines, and links are supported."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
                maxLength={1000}
              />
              <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                {description.length}/1000
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Cover Image
            </label>
            <p className="text-gray-400 text-sm mb-3">
              We recommend an image that's at least 800px wide and 320px tall.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Upload Cover Image
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 pt-6">
          <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Back
          </button>
          <div className="flex gap-3">
            <button className="text-gray-400 hover:text-gray-300 font-medium px-6 py-2 transition-colors">
              Cancel
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}