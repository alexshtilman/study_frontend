import React, { useEffect } from "react";
import CONFIG from "../config.json";

function useSubscribeEffect(service, next, callBacksetNoConnection) {
  const [data, setData] = React.useState([]);
  const pollingState = React.useRef();

  let subscription;
  const serviceGetter = async () => {
    subscription = await next.call(service).subscribe(
      (response) => {
        callBacksetNoConnection("");
        if (response) {
          if (response.length > 0) setData(response);
          else setData([]);
        } else setData([]);
      },
      (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            callBacksetNoConnection(`Authorization requested!`);
            clearInterval(pollingState.current);
          }
        } else
          callBacksetNoConnection(
            `\nConnection to JSON server refused!\n\n\nCheck that ${CONFIG.baseUrl} is running!`
          );
      }
    );
  };
  useEffect(() => {
    const id = setInterval(serviceGetter, CONFIG.pollingInterval);
    pollingState.current = id;
    return () => {
      clearInterval(pollingState.current);
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return [data, setData];
}
export default useSubscribeEffect;
