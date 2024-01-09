import React, { useEffect, useRef, useCallback, useState } from "react";

function App() {
  // State variables to manage the password and generator options
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(6);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);

  // State variable to manage the button text during and after copying
  const [copyButtonText, setCopyButtonText] = useState("COPY");

  // Reference for the password input field
  const passwordRef = useRef(null);

  // Function to generate a random password based on user options
  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

    // Include numbers in the password if the user allows
    if (isNumberAllowed) {
      str += "0123456789";
    }

    // Include special characters in the password if the user allows
    if (isCharAllowed) {
      str += "!@#$&*-_=~{}";
    }

    // Generate the password by randomly selecting characters
    for (let i = 0; i < passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      generatedPassword += str[randomIndex];
      console.log(generatedPassword);
    }

    // Set the generated password in the state
    setPassword(generatedPassword);
  }, [passwordLength, isNumberAllowed, isCharAllowed, setPassword]);

  // Function to copy the password to the clipboard
  const copyPasswordToClipBoard = useCallback(() => {
    // Select and copy the password to the clipboard
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);

    // Change the button text to "COPIED" and reset after 3 seconds
    setCopyButtonText("COPIED");
    setTimeout(() => {
      setCopyButtonText("COPY");
    }, 3000);
  }, [password]);

  // Effect to generate a password whenever the generator options change
  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, isNumberAllowed, isCharAllowed, passwordGenerator]);

  // JSX structure for the component
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-12 bg-gray-800">
        {/* Password Generator Title */}
        <h1 className="text-white font-semibold text-center my-3">
          Password Generator
        </h1>

        {/* Password Input and Copy Button */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />

          {/* Copy Button with Hover and Active Effects */}
          <button
            className="outline-none font-semibold bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-900 active:bg-blue-600 transition-colors duration-200"
            onClick={copyPasswordToClipBoard}
          >
            {copyButtonText}
          </button>
        </div>

        {/* Generator Options - Length, Numbers, Characters */}
        <div className="flex text-sm gap-x-2 text-white font-semibold pb-2">
          {/* Password Length Slider */}
          <div className="flex items-center gap-x-1 ">
            <input
              className="cursor-pointer"
              type="range"
              min={6}
              max={25}
              value={passwordLength}
              onChange={(e) => {
                setPasswordLength(e.target.value);
              }}
            />
            <label>Length: {passwordLength}</label>
          </div>

          {/* Checkbox for Including Numbers */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isNumberAllowed}
              id="numberInput"
              onChange={() => {
                setIsNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          {/* Checkbox for Including Special Characters */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isCharAllowed}
              id="charInput"
              onChange={() => {
                setIsCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
