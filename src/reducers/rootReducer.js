import globalReducer, {
  GLOBAL_STORE_NAME
} from "../stores/globalStore/GlobalStore";

const initialState = {
  [GLOBAL_STORE_NAME]: globalReducer
};
export default initialState;
