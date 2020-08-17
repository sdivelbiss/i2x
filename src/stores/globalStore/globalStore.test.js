import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { STATUS } from "../../constants/constants";

import globalReducer, {
  globalStore_initialState,
  globalStore_setConnectionStatus,
  globalStore_setLogResults,
  globalStore_setPhrases,
  globalStore_deletePhrase,
  SET_STATUS,
  SET_PHRASES
} from "./GlobalStore";

const testLog = [
  {
    transcript: {
      utterance: "My name's, Scott.",
      startOffsetMsec: 2490,
      endOffsetMsec: 3960
    },
    spotted: []
  },
  {
    transcript: {
      utterance: "How're you.",
      startOffsetMsec: 5640,
      endOffsetMsec: 6690
    },
    spotted: ["you"]
  },
  {
    transcript: {
      utterance: "OK, here's a really long sentence that Doesn't stop.",
      startOffsetMsec: 8160,
      endOffsetMsec: 10560
    },
    spotted: []
  }
];

describe("GlobalStore reducer", () => {
  const initialState = globalStore_initialState;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it("should return the initial state", () => {
    expect(globalReducer(undefined, {})).toEqual(initialState);
  });

  it("Should set the status to online", () => {
    const expectedAction = {
      type: SET_STATUS.ACTION,
      payload: STATUS.ONLINE
    };
    const store = mockStore({});

    store.dispatch(globalStore_setConnectionStatus(STATUS.ONLINE));

    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it("Should set 2 phrases", () => {
    const expectedAction = {
      type: SET_PHRASES.ACTION,
      payload: ["test", "phrase"]
    };
    const store = mockStore({});

    store.dispatch(globalStore_setPhrases(["test", "phrase"]));

    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it("Should set 2 phrases", () => {
    const expectedAction = {
      type: SET_PHRASES.DELETE,
      payload: "delete"
    };
    const store = mockStore({});

    store.dispatch(globalStore_deletePhrase("delete"));

    expect(store.getActions()[0]).toEqual(expectedAction);
  });

  it("Should set 3 log items", () => {
    const store = mockStore({});

    store.dispatch(globalStore_setLogResults(testLog));

    expect(store.getActions()[0].payload.length).toEqual(testLog.length);
  });

  // xit('should update the current screen size in the state ', () => {
  //   const expectedAction = {
  //     type: SET_SCREEN_SIZE_CHANGE.ACTION,
  //     payload: { width: 100, height: 200 },
  //   };
  //   const store = mockStore({ currentScreenSize: null });

  //   store.dispatch(configStore_setScreenSize(100, 200));

  //   expect(store.getActions()[0]).toEqual(expectedAction);
  // });

  // xit('should handle SHOW_BUSY_OVERLAY.ACTION', () => {
  //   expect(
  //     globalReducer(initialState, {
  //       type: SHOW_BUSY_OVERLAY.ACTION,
  //     })
  //   ).toEqual({
  //     appContext: '',
  //     gnVideoStream: {},
  //     isBusyOverlayOpen: true,
  //     isSideMenuPinnedOpen: false,
  //     mainNavMenu: [],
  //     screenSize: null,
  //   });
  // });

  // xit('should handle HIDE_BUSY_OVERLAY.ACTION', () => {
  //   expect(
  //     globalReducer(initialState, {
  //       type: HIDE_BUSY_OVERLAY.ACTION,
  //     })
  //   ).toEqual({
  //     appContext: '',
  //     gnVideoStream: {},
  //     isBusyOverlayOpen: false,
  //     isSideMenuPinnedOpen: false,
  //     mainNavMenu: [],
  //     screenSize: null,
  //   });
  // });

  // it('should handle SHOW_SUCCESS_TOAST.ACTION', () => {
  //   expect(
  //     globalReducer(initialState, {
  //       type: SHOW_SUCCESS_TOAST.ACTION,
  //       payload: { title: 'testing' },
  //     })
  //   ).toEqual({
  //     appContext: '',
  //     gnVideoStream: {},
  //     isBusyOverlayOpen: false,
  //     isSideMenuPinnedOpen: false,
  //     mainNavMenu: [],
  //     screenSize: null,
  //   });
  // });

  // it('should handle SHOW_ERROR_TOAST.ACTION', () => {
  //   expect(
  //     globalReducer(initialState, {
  //       type: SHOW_ERROR_TOAST.ACTION,
  //       payload: { title: 'testing' },
  //     })
  //   ).toEqual({
  //     appContext: '',
  //     gnVideoStream: {},
  //     isBusyOverlayOpen: false,
  //     isSideMenuPinnedOpen: false,
  //     mainNavMenu: [],
  //     screenSize: null,
  //   });
  // });
});
