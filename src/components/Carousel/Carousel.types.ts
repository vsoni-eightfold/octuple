import React, {
  ComponentType,
  createContext,
  ReactNode,
  Ref,
  RefObject,
} from 'react';
import type { CustomEasing } from 'smooth-scroll-into-view-if-needed';
import type { CustomScrollBehaviorCallback } from 'scroll-into-view-if-needed/typings/types';
import { observerOptions as defaultObserverOptions } from './Settings';
import { autoScrollApiType } from './autoScrollApi';
import { OcBaseProps } from '../OcBase';
import { PaginationLocale } from '../Pagination';

export type CarouselTransition = 'push' | 'crossfade';
export type CarouselType = 'slide' | 'scroll';
export type CustomScrollBehavior<T> =
  | ScrollBehavior
  | CustomScrollBehaviorCallback<T>;

export type Item = [string, IntersectionObserverItem];
export type ItemOrElement = IntersectionObserverItem | Element | undefined;
export type ItemType = React.ReactElement<{
  /**
   * The item id.
   */
  itemId: string;
}>;
export type visibleElements = string[];

export interface DataType {
  /**
   * The interval timeout.
   */
  timeout?: null | ReturnType<typeof setTimeout>;
}

export interface ContextProps {
  /**
   * Sets the animation state.
   */
  setAnimating: (a: boolean) => void;
  /**
   * The custom interval.
   */
  setCustomInterval: (a: boolean | number) => void;
}

export const CarouselContext: React.Context<ContextProps> = createContext(
  {} as ContextProps
);
export const VisibilityContext: React.Context<autoScrollApiType> =
  React.createContext<autoScrollApiType>({} as autoScrollApiType);

export const dataKeyAttribute: string = 'data-key';
export const dataIndexAttribute: string = 'data-index';
export const id: string = 'itemId';
export const innerWrapperClassName: string =
  'carousel-auto-scroll-inner-wrapper';
export const itemClassName: string = 'carousel-scroll-menu-item';
export const separatorClassName: string = 'carousel-scroll-menu-separator';
export const separatorString: string = '-separator';

export interface CarouselProps
  extends Omit<
    OcBaseProps<HTMLDivElement>,
    'onMouseDown' | 'onMouseMove' | 'onMouseUp' | 'onWheel'
  > {
  /**
   * index of the active item.
   * @default 0
   */
  activeIndex?: number;
  /**
   * Whether to automatically animate slide transitions.
   * @default true
   */
  auto?: boolean;
  /**
   * Carousel scroll menu props.
   * Use when Carousel type is 'scroll'.
   */
  carouselScrollMenuProps?: ScrollMenuProps;
  /**
   * Whether to display the previous and next controls.
   * @default true
   */
  controls?: boolean;
  /**
   * The amount of time to delay between automatically cycling an item.
   * If false, carousel will not automatically cycle.
   * Only available for Carousel type 'slide'.
   */
  interval?: boolean | number;
  /**
   * The Carousel locale.
   * @default 'enUS'
   */
  locale?: PaginationLocale;
  /**
   * Set whether the carousel should cycle continuously or have hard stops.
   * @default true
   */
  loop?: boolean;
  /**
   * The next icon button aria-label string.
   * @default 'Next'
   */
  nextIconButtonAriaLabel?: string;
  /**
   * Callback fired on mouse enter event.
   */
  onMouseEnter?: () => React.MouseEventHandler;
  /**
   * Callback fired when a Carousel transition ends.
   */
  onPivotEnd?: (active: number, direction: string) => void;
  /**
   * Callback fired when a Carousel transition starts.
   */
  onPivotStart?: (active: number, direction: string) => void;
  /**
   * Adds Pagination at the bottom of the Carousel.
   * @default true
   */
  pagination?: boolean;
  /**
   * If set to 'hover', pauses the cycling of the carousel on
   * mouseenter and resumes the cycling of the carousel on mouseleave.
   * If set to false, hovering over the carousel won't pause it.
   * @default 'hover'
   */
  pause?: boolean | 'hover';
  /**
   * The previous icon button aria-label string.
   * @default 'Previous'
   */
  previousIconButtonAriaLabel?: string;
  /**
   * Set type of slide transition.
   * @default 'push'
   */
  transition?: CarouselTransition;
  /**
   * Set the type of Carousel.
   * @default 'slide'
   */
  type?: CarouselType;
}

export interface CarouselSlideProps extends OcBaseProps<HTMLDivElement> {
  /**
   * The active Carousel item.
   */
  active?: boolean;
  /**
   * The slide renderer.
   */
  children?: React.ReactNode;
  /**
   * The direction of the pivot.
   * options: `next` or `previous`.
   */
  direction?: string;
  /**
   * The amount of time to delay between automatically cycling an item.
   * If false, carousel will not automatically cycle.
   */
  interval?: boolean | number;
}

export interface Refs {
  /**
   * The menu item ref.
   */
  [key: string]: React.MutableRefObject<RefObject<HTMLElement>[] | null>;
}

export interface IntersectionObserverItem {
  /**
   * Describes the intersection between the target element and
   * its root container at a specific moment of transition.
   */
  entry: IntersectionObserverEntry;
  /**
   * The item index.
   */
  index: string;
  /**
   * The item key.
   */
  key: string;
  /**
   * The item visibility.
   */
  visible: boolean;
}

export interface scrollToItemOptions {
  /**
   * The boundary element.
   */
  boundary?: HTMLElement | null;
  /**
   * The transition duration.
   */
  duration?: number;
  /**
   * The transition easing curve.
   */
  ease?: CustomEasing;
}

export interface ScrollMenuProps
  extends Omit<
    OcBaseProps<HTMLDivElement>,
    'onMouseDown' | 'onMouseMove' | 'onMouseUp' | 'onScroll' | 'onWheel'
  > {
  /**
   * Ref object for access VisibilityContextApi outside of context
   * e.g. apiRef.current.scrollToItem(...)
   */
  apiRef?: React.MutableRefObject<autoScrollApiType>;
  /**
   * The child renderer.
   * Every child should have a unique `itemId` prop.
   */
  children: ItemType | ItemType[];
  /**
   * The container padding around menu items.
   * @default 0
   */
  containerPadding?: number;
  /**
   * The pixel gap between items.
   */
  gap?: number;
  /**
   * Custom classname of item.
   */
  itemClassNames?: string;
  /**
   * Next button component.
   */
  nextButton?: ComponentType;
  /**
   * Disable scrollIntoView polyfill
   */
  noPolyfill?: boolean;
  /**
   * Callback fired on init.
   */
  onInit?: (api: autoScrollApiType) => void;
  /**
   * Callback fired on mouse down.
   */
  onMouseDown?: (arg0: autoScrollApiType) => React.MouseEventHandler;
  /**
   * Callback fired on mouse up.
   */
  onMouseUp?: (arg0: autoScrollApiType) => React.MouseEventHandler;
  /**
   * Callback fired on mouse move.
   */
  onMouseMove?: (arg0: autoScrollApiType) => React.MouseEventHandler;
  /**
   * Callback fired on scroll.
   */
  onScroll?: (
    api: autoScrollApiType,
    ev: React.UIEvent
  ) => React.UIEventHandler;
  /**
   * Callback fired when visibility of items change.
   */
  onUpdate?: (api: autoScrollApiType) => void;
  /**
   * Handler on mouse wheel.
   */
  onWheel?: (api: autoScrollApiType, ev: React.WheelEvent) => void;
  /**
   * Options for intersection observer.
   */
  options?: Partial<typeof defaultObserverOptions>;
  /**
   * Previous button component.
   */
  previousButton?: ComponentType;
  /**
   * The scroll menu ref.
   */
  ref?: Ref<HTMLDivElement>;
  /**
   * Whether the canvas direction is rtl.
   */
  rtl?: boolean;
  /**
   * Custom classname of scroll container.
   */
  scrollContainerClassNames?: string;
  /**
   * Custom classname of wrapper.
   */
  scrollWrapperClassNames?: string;
  /**
   * Custom classname of item separator.
   */
  separatorClassNames?: string;
  /**
   * Transition behavior can be 'smooth', 'auto' or custom function
   * Example:
   * (instructions) => {
   *   const [{ el, left }] = instructions;
   *   const styler = Styler(el);
   *
   *   animate({
   *     from: el.scrollLeft,
   *     to: left,
   *     type: 'spring',
   *     onUpdate: (left) => styler.set('scrollLeft', left),
   *   });
   * }
   */
  transitionBehavior?: string | Function;
  /**
   * Duration of transition.
   */
  transitionDuration?: number;
  /**
   * Easing function for transition.
   * Example: t => t*(2-t)
   * See https://gist.github.com/gre/1650294#file-easing-js
   */
  transitionEase?: (t: number) => number;
}

export interface ScrollContainerProps
  extends Omit<OcBaseProps<HTMLUListElement>, 'onScroll'> {
  /**
   * Custom classnames of the scroll container.
   */
  classNames?: string;
  /**
   * The child renderer.
   */
  children?: ReactNode;
  /**
   * The container padding around menu items.
   * @default 0
   */
  containerPadding?: number;
  /**
   * Callback fired on scroll.
   */
  onScroll?: (event: UIEvent) => void;
  /**
   * The scroll container ref.
   */
  ref: Ref<HTMLUListElement>;
  /**
   * Whether the canvas direction is rtl.
   */
  rtl?: boolean;
}

export interface MenuItemsProps {
  /**
   * The child renderer.
   */
  children?: ItemType | ItemType[];
  /**
   * The pixel gap between items.
   */
  gap?: number;
  /**
   * Custom item classnames.
   */
  itemClassNames?: string;
  /**
   * The item refs.
   */
  refs: Refs;
  /**
   * Whether the canvas direction is rtl.
   */
  rtl?: boolean;
  /**
   * Custom separator classnames.
   */
  separatorClassNames?: string;
}

export interface ItemProps {
  /**
   * The child renderer.
   */
  children?: React.ReactNode;
  /**
   * The custom classnames.
   */
  classNames?: string;
  /**
   * The item id.
   */
  id: string;
  /**
   * The item index.
   */
  index: number;
  /**
   * The item refs.
   */
  refs: Refs;
  /**
   * The custom style.
   */
  style?: React.CSSProperties;
}

export interface SeparatorProps {
  /**
   * The separator custom classnames.
   */
  classNames: string;
  /**
   * The separator id.
   */
  id: string;
  /**
   * The separator index.
   */
  index: number;
  /**
   * The separator refs.
   */
  refs: Refs;
  /**
   * The custom style.
   */
  style?: React.CSSProperties;
}
