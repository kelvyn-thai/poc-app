export function createBareSubscription<S>(getter: () => S) {
  let lastValue: S | undefined;
  const subscriptions: ((state: S, prevState?: S) => void)[] = [];
  const subscribe = (fn: (state: S, prevState?: S) => void) => {
    const currentValue = getter();
    fn(currentValue, lastValue);
    lastValue = currentValue;

    subscriptions.push(fn);
    return () => {
      subscriptions.splice(subscriptions.indexOf(fn), 1);
    };
  };
  const notify = () => {
    const currentValue = getter();
    subscriptions.forEach((fn) => fn(currentValue, lastValue));
    lastValue = currentValue;
  };
  return [subscribe, notify] as const;
}
