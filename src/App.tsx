import { useState } from "react";
import VideoRoom from "./components/VideoRoom";

function App() {
  const [joined, setJoined] = useState(false);

  return (
    <>
      <div className="bg-gray-900 w-screen h-screen overflow-x-hidden">
        <div className="flex justify-center mt-10">
          <div className="flex justify-center flex-col text-center item-center">
            <h1 className="text-yellow-400 text-4xl font-bold ">OlaCall</h1>
            {!joined && (
              <button
                onClick={() => setJoined(true)}
                className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-orange-600 text-orange-600 "
              >
                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-orange-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                <span className="relative text-orange-600 transition duration-300 group-hover:text-white ease">
                  Join Room
                </span>
              </button>
            )}
            <div className="mt-20">{joined && <VideoRoom />}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
