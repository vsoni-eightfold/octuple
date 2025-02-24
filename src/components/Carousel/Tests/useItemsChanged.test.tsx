import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { IntersectionObserverItem, id as itemId } from '../Carousel.types';
import { useItemsChanged } from '../Hooks/useItemsChanged';
import ItemsMap from '../ItemsMap';
import { render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

const TestComponent = ({
  menuItems,
  items,
}: {
  menuItems: any;
  items: ItemsMap;
}) => {
  const hash = useItemsChanged(menuItems, items);

  return <div data-testid="hash">{JSON.stringify(hash)}</div>;
};

describe('useItemsChanged', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  const getChildren = (keys: string[]) =>
    keys.map((key) => {
      const props = { [itemId]: key };

      return (
        <div {...props} key={key}>
          {key}
        </div>
      );
    });

  describe('should return hash based on children', () => {
    test('empty string if there is no children', () => {
      const utils = render(
        <TestComponent menuItems={undefined} items={new ItemsMap()} />
      );

      const hash = JSON.parse(utils.getByTestId('hash').textContent!);

      expect(hash).toEqual('');
    });

    test('should return hash when have children', () => {
      const childrenKeys = ['child1', 'chidl2'];

      const children = getChildren(childrenKeys);

      const utils = render(
        <TestComponent menuItems={children} items={new ItemsMap()} />
      );

      const hash = JSON.parse(utils.getByTestId('hash').textContent!);
      expect(hash).toEqual(childrenKeys.join(''));

      const newChildrenKeys = childrenKeys.concat('child3');
      const newChildren = getChildren(newChildrenKeys);
      utils.rerender(
        <TestComponent menuItems={newChildren} items={new ItemsMap()} />
      );

      const newHash = JSON.parse(utils.getByTestId('hash').textContent!);
      expect(newHash).toEqual(newChildrenKeys.join(''));
    });
  });

  describe('when child is removed', () => {
    test('should remove child from ItemsMap', () => {
      const childrenKeys = [
        'child1',
        'child1-separator',
        'chidl2',
        'child2-separator',
        'child3',
      ];
      const itemsMap = new ItemsMap();

      const children = getChildren(childrenKeys);

      const utils = render(
        <TestComponent menuItems={children} items={itemsMap} />
      );

      const hash = JSON.parse(utils.getByTestId('hash').textContent!);
      expect(hash).toEqual(childrenKeys.join(''));

      childrenKeys.forEach((key) => {
        itemsMap.set(key, { key } as IntersectionObserverItem);
      });
      expect(itemsMap.toItems()).toEqual(childrenKeys);

      const removeFirst = (arr: any[]) => arr.slice(1);

      const newChildren = removeFirst(children);

      utils.rerender(
        <TestComponent menuItems={newChildren} items={itemsMap} />
      );

      expect(itemsMap.toItems()).toEqual([
        'chidl2',
        'child2-separator',
        'child3',
      ]);

      const newHash = JSON.parse(utils.getByTestId('hash').textContent!);
      expect(newHash).toEqual(removeFirst(childrenKeys).join(''));
    });

    test('should remove last item with prev separator', () => {
      const childrenKeys = [
        'child1',
        'child1-separator',
        'chidl2',
        'child2-separator',
        'child3',
      ];
      const itemsMap = new ItemsMap();

      const children = getChildren(childrenKeys);

      const utils = render(
        <TestComponent menuItems={children} items={itemsMap} />
      );

      const hash = JSON.parse(utils.getByTestId('hash').textContent!);
      expect(hash).toEqual(childrenKeys.join(''));

      childrenKeys.forEach((key) => {
        itemsMap.set(key, { key } as IntersectionObserverItem);
      });
      expect(itemsMap.toItems()).toEqual(childrenKeys);

      const removeLast = (arr: any[]) => arr.slice(0, -1);

      const newChildren = removeLast(children);

      utils.rerender(
        <TestComponent menuItems={newChildren} items={itemsMap} />
      );

      expect(itemsMap.toItems()).toEqual([
        'child1',
        'child1-separator',
        'chidl2',
        'child2-separator',
      ]);

      const newHash = JSON.parse(utils.getByTestId('hash').textContent!);
      expect(newHash).toEqual(removeLast(childrenKeys).join(''));
    });
  });
});
