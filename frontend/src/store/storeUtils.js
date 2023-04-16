// Import core
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";


export function useAppSelector(selector) {
    return useSelector(selector)
}

export function useAppAction(action) {
    const dispatch = useDispatch()
    return useCallback((...args) => dispatch(action(...args)), [action, dispatch])
}

// export const storeUitil = {
//     useAppAction,
//     useAppSelector
// }