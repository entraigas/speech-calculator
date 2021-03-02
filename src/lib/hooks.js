import { useEffect, useRef } from 'react'

const useDidMount = f => useEffect(() => f && f(), []);

const useWillUnmount = f => useEffect(() => () => f && f(), []);

const useDidUpdate = (f, conditions) => {
  const didMountRef = useRef(false)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    // Cleanup effects when f returns a function
    return f && f() //eslint-disable-line
  }, conditions)
};

export { useDidMount, useWillUnmount, useDidUpdate };
