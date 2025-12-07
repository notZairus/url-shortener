import "./index.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const validateInput = () => {
    if (url.length < 5) {
      setIsError("Invalid Input.");
      return true;
    }
  };

  const submit = () => {
    if (validateInput()) {
      return;
    }

    setIsLoading(true);
    axios
      .post("http://localhost:1212/url", { url })
      .then((response) => {
        const shortUrl = response.data.shortUrl;
        navigator.clipboard.writeText(shortUrl);
        alert(`Text copied: ${shortUrl}`);

        setIsLoading(false);
        setIsError("");
      })
      .catch((error) => {
        setIsError(error.response.data.errors[0].msg);
      });
  };

  return (
    <>
      <div className="w-full h-screen bg-[#202020]">
        <div className="w-full h-full flex items-center">
          <div className="w-10/12 md:w-2/3 mx-auto flex flex-col items-center gap-8">
            <div>
              <h1 className="text-white text-center font-black text-4xl tracking-tight">
                URL Shortener
              </h1>
              {!isLoading && (
                <p className="text-gray-400 text-center text-xl">
                  Simplify your urls with an easy-to-use URL shortener.
                </p>
              )}
            </div>
            <div className="md:w-2/3 w-full">
              <input
                type="text"
                placeholder="https://example.com/sad54xc82nwg423e"
                required
                className="text-lg md:text-xl border rounded-xl outline-0 text-white px-4 py-3 w-full text-center tracking-wider"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
              {isError && (
                <p className="text-red-400 text-center mt-2">{isError}</p>
              )}
            </div>
            <div>
              <button
                className="text-white border-2 border-white rounded-xl text-xl px-4 py-2 hover:text-black hover:bg-white transition cursor-pointer"
                onClick={submit}
              >
                Shorten the url!!!!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
