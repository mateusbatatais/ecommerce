import React, { createContext, useState, useContext } from "react";

const ToastContext = createContext<any | null>(null);

export default function ToastProvider({ children }: any) {
  const [toast, setToast] = useState(false);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  const { toast, setToast }: any = context;
  return { toast, setToast };
}
