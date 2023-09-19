import { onBeforeUnmount } from 'vue';

const stackMap = new Map<symbol, () => void>();
const stack: symbol[] = [];

export function useOverlayStack(onDispose: () => void = () => {}) {
  const id = Symbol(Math.random().toString(36).substring(2));

  function push() {
    if (!stackMap.has(id)) {
      stackMap.set(id, onDispose);
      stack.push(id);
    }

    if (!document.documentElement.classList.contains('overlay-open')) {

      document.documentElement.classList.add('overlay-open');
    }
  }

  function pop() {
    const lastIndex = stack.length - 1;
    const lastId = stack[lastIndex];

    if (lastId === id) {
      const dispose = stackMap.get(id);
      stackMap.delete(id);
      dispose?.();
      stack.splice(lastIndex, 1);
    }

    if (stack.length === 0) {

      document.documentElement.classList.remove('overlay-open'); 
    }
  }

  function dispose() {
    stackMap.delete(id);
    const index = stack.indexOf(id);
    if (index >= 0) {
      stack.splice(index, 1);

    }
  }

  onBeforeUnmount(dispose);

  return {
    push,
    pop,
    dispose, 
  };
}
