import {
  filterSeparators,
  scrollToItem,
  getItemElementById,
  getItemElementByIndex,
} from './Utilities';
import ItemsMap from './ItemsMap';
import type {
  CustomScrollBehavior,
  IntersectionObserverItem,
  ItemOrElement,
  scrollToItemOptions,
  visibleElements,
} from './Carousel.types';

export const autoScrollApi = (
  items: ItemsMap,
  visibleElementsWithSeparators: visibleElements = [],
  boundaryElement?: React.MutableRefObject<HTMLElement | null>,
  transitionOptions?: {
    duration?: number;
    ease?: (t: number) => number;
    behavior: string | Function;
  },
  rtl?: boolean,
  noPolyfill?: boolean
) => {
  const visibleElements: visibleElements = filterSeparators(
    visibleElementsWithSeparators
  );

  const isFirstItemVisible: boolean = !!items.first()?.visible;
  const isLastItemVisible: boolean = !!items.last()?.visible;

  const getItemById: (id: string) => IntersectionObserverItem = (id: string) =>
    items.find((value) => value[1].key === String(id))?.[1];

  const getItemByIndex: (index: number | string) => IntersectionObserverItem = (
    index: number | string
  ) => items.find((el) => String(el[1].index) === String(index))?.[1];

  const isItemVisible: (id: string) => boolean = (id: string) =>
    visibleElements.includes(String(id));

  const getPrevItem: () => IntersectionObserverItem = () =>
    items.prev(items.getVisible()?.[0]?.[1]);

  const getPrevElement: () => IntersectionObserverItem = () =>
    items.prev(items.getVisibleElements()?.[0]?.[1], true);

  const getNextItem: () => IntersectionObserverItem = () =>
    items.next(items.getVisible()?.slice?.(-1)?.[0]?.[1]);

  const getNextElement: () => IntersectionObserverItem = () =>
    items.next(items.getVisibleElements()?.slice?.(-1)?.[0]?.[1], true);

  const isLastItem: (id: string) => boolean = (id: string) =>
    items.last() === getItemById(id);

  const scrollPrev = <T>(
    behavior?: CustomScrollBehavior<T>,
    inline?: ScrollLogicalPosition,
    block?: ScrollLogicalPosition,
    {
      duration,
      ease,
      boundary = boundaryElement?.current,
    }: scrollToItemOptions = {}
  ) => {
    const _behavior = (behavior ??
      transitionOptions?.behavior) as ScrollBehavior;

    return scrollToItem(
      getPrevItem(),
      _behavior,
      inline || 'end',
      block || 'nearest',
      {
        boundary,
        duration: duration ?? transitionOptions?.duration,
        ease: ease ?? transitionOptions?.ease,
      },
      rtl || noPolyfill
    );
  };

  const scrollNext = <T>(
    behavior?: CustomScrollBehavior<T>,
    inline?: ScrollLogicalPosition,
    block?: ScrollLogicalPosition,
    {
      duration,
      ease,
      boundary = boundaryElement?.current,
    }: scrollToItemOptions = {}
  ) => {
    const _behavior = (behavior ??
      transitionOptions?.behavior) as ScrollBehavior;

    return scrollToItem(
      getNextItem(),
      _behavior,
      inline || 'start',
      block || 'nearest',
      {
        boundary,
        duration: duration ?? transitionOptions?.duration,
        ease: ease ?? transitionOptions?.ease,
      },
      rtl || noPolyfill
    );
  };

  return {
    getItemById,
    getItemElementById,
    getItemByIndex,
    getItemElementByIndex,
    getNextItem,
    getNextElement,
    getPrevItem,
    getPrevElement,
    isFirstItemVisible,
    isItemVisible,
    isLastItem,
    isLastItemVisible,
    scrollNext,
    scrollPrev,
    scrollToItem: <T>(
      target?: ItemOrElement,
      behavior?: CustomScrollBehavior<T>,
      inline?: ScrollLogicalPosition,
      block?: ScrollLogicalPosition,
      options?: scrollToItemOptions
    ) => {
      const _behavior: string | Function =
        behavior ?? transitionOptions?.behavior;

      return scrollToItem(
        target,
        _behavior as ScrollBehavior | CustomScrollBehavior<T>,
        inline,
        block,
        {
          boundary: boundaryElement?.current,
          ...options,
          duration: options?.duration ?? transitionOptions?.duration,
          ease: options?.ease ?? transitionOptions?.ease,
        }
      );
    },
    visibleElements,
    visibleElementsWithSeparators,

    visibleItems: visibleElementsWithSeparators,
    visibleItemsWithoutSeparators: visibleElements,
  };
};

export interface autoScrollApiType extends ReturnType<typeof autoScrollApi> {
  initComplete: boolean;
  items: ItemsMap;
  scrollContainer: React.RefObject<HTMLElement | null>;
  visibleElements: visibleElements;
  visibleElementsWithSeparators: visibleElements;
}
