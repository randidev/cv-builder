import React, { PropsWithChildren, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import Layout from "@/components/Layout";
import { Analytics } from "@vercel/analytics/react";

const MockPersistGate: React.FC<PropsWithChildren> = ({ children }) => (
  <>{children}</>
);

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <MockPersistGate>{children}</MockPersistGate>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export * from "@testing-library/user-event";
export { customRender as render };
