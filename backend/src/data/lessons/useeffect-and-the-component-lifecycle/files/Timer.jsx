// Lesson 46: the Timer moves in (mount) and out (unmount).
import { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  // 1-2. Log on mount, start the interval, and clean up on unmount

  return <p id="timer">⏱ {seconds}s</p>;
}
