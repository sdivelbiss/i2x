import React, { useContext } from "react";

export const ASRContext = React.createContext(null);

export const useASRClient = () => useContext(ASRContext);
