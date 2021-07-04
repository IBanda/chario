import React, { useEffect, useState, useRef, useCallback } from 'react';

type Status = 'idle' | 'pending' | 'resolved' | 'rejected';

interface HookState {
  data: any;
  status: Status;
  error?: string;
}

function useSafeSetPayload(
  setState: React.Dispatch<React.SetStateAction<any>>
) {
  const isMounted = useRef<boolean | undefined>();
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return useCallback(
    (args) => {
      if (isMounted.current) {
        setState(args);
      }
    },
    [setState]
  );
}

export default function useFetch(url: RequestInfo, init: RequestInit) {
  const [payload, setPayload] = useState<HookState>({
    data: undefined,
    status: 'idle',
    error: '',
  });

  const safeSetPayload = useSafeSetPayload(setPayload);

  useEffect(() => {
    const initial: RequestInit = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-Type': 'application/json',
      },
      ...(init ? init : null),
    };

    if (init?.body) {
      initial.body = JSON.stringify(init?.body);
    }
    safeSetPayload((prev: HookState) => ({
      ...prev,
      data: undefined,
      status: 'pending',
    }));
    fetch(url, initial)
      .then((data) => {
        safeSetPayload((prev: HookState) => ({
          ...prev,
          data,
          status: 'resolved',
        }));
      })
      .catch((error) => {
        safeSetPayload({
          data: undefined,
          status: 'rejected',
          error: error.message,
        });
      });
  }, [init, safeSetPayload, url]);

  return [payload];
}
