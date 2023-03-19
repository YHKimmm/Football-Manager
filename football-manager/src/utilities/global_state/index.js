import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    defaultSeason: '2015',
});

export { useGlobalState, setGlobalState };