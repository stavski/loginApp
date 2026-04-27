import { useContext } from "react";
import { AccountFormContext } from '../contexts/AccountFormContext';

export function useAccontForm() {
    const context = useContext(AccountFormContext).accountFormData;

    return context;
}