import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import globalReducer, {
  globalStore_initialState,
  IS_SIDE_MENU_PINNED_OPEN,
  SET_SCREEN_SIZE_CHANGE,
  HIDE_BUSY_OVERLAY,
  SHOW_BUSY_OVERLAY,
  SHOW_ERROR_TOAST,
  SHOW_SUCCESS_TOAST,
  configStore_setIsSideMenuPinnedOpen,
  configStore_setScreenSize,
} from './GlobalStore';
import imagesReducer, { LOAD_IMAGES } from '../imageStore/ImagesStore';

describe('GlobalStore reducer', () => {
  const initialState = globalStore_initialState;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it('should return the initial state', () => {
    expect(globalReducer(undefined, {})).toEqual(initialState);
  });

  it('should make sure the side menu responds to the side-pin action', () => {
    const expectedAction = {
      type: IS_SIDE_MENU_PINNED_OPEN.ACTION,
      payload: false,
    };
    const store = mockStore({ isSideMenuPinnedOpen: null });

    store.dispatch(configStore_setIsSideMenuPinnedOpen(false));

    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it('should update the current screen size in the state ', () => {
    const expectedAction = {
      type: SET_SCREEN_SIZE_CHANGE.ACTION,
      payload: { width: 100, height: 200 },
    };
    const store = mockStore({ currentScreenSize: null });

    store.dispatch(configStore_setScreenSize(100, 200));

    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it('should handle SHOW_BUSY_OVERLAY.ACTION', () => {
    expect(
      globalReducer(initialState, {
        type: SHOW_BUSY_OVERLAY.ACTION,
      })
    ).toEqual({
      appContext: '',
      gnVideoStream: {},
      isBusyOverlayOpen: true,
      isSideMenuPinnedOpen: false,
      mainNavMenu: [],
      screenSize: null,
    });
  });

  it('should handle HIDE_BUSY_OVERLAY.ACTION', () => {
    expect(
      globalReducer(initialState, {
        type: HIDE_BUSY_OVERLAY.ACTION,
      })
    ).toEqual({
      appContext: '',
      gnVideoStream: {},
      isBusyOverlayOpen: false,
      isSideMenuPinnedOpen: false,
      mainNavMenu: [],
      screenSize: null,
    });
  });

  it('should handle SHOW_SUCCESS_TOAST.ACTION', () => {
    expect(
      globalReducer(initialState, {
        type: SHOW_SUCCESS_TOAST.ACTION,
        payload: { title: 'testing' },
      })
    ).toEqual({
      appContext: '',
      gnVideoStream: {},
      isBusyOverlayOpen: false,
      isSideMenuPinnedOpen: false,
      mainNavMenu: [],
      screenSize: null,
    });
  });

  it('should handle SHOW_ERROR_TOAST.ACTION', () => {
    expect(
      globalReducer(initialState, {
        type: SHOW_ERROR_TOAST.ACTION,
        payload: { title: 'testing' },
      })
    ).toEqual({
      appContext: '',
      gnVideoStream: {},
      isBusyOverlayOpen: false,
      isSideMenuPinnedOpen: false,
      mainNavMenu: [],
      screenSize: null,
    });
  });
});
