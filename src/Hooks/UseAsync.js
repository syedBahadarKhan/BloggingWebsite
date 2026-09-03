import { useEffect, useState } from "react";

/**
 * Generic async-state wrapper. Every data-fetching hook in this project
 * builds on top of this so loading/error/empty handling is consistent
 * across every page.
 *
 * @param {Function} asyncFn - function returning a Promise, re-run when deps change
 * @param {Array} deps - dependency array (like useEffect)
 */
export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    asyncFn()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
