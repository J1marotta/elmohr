import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { SetLoading, SetError, SetIdle } from "./features/Meta/MetaSlice";

afterEach(() => {
  cleanup();
  store.dispatch(SetIdle());
});

test("Starts Idle and shows welcome", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const meta = store.getState().meta;

  expect(meta.status).toBe("idle");
  expect(getByText(/welcome/i)).toBeInTheDocument();
});

test("loading state", async () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  store.dispatch(SetLoading());

  const meta = store.getState().meta;
  const loader = getByTestId("loader");

  expect(meta.status).toBe("loading");
  expect(loader).toBeInTheDocument();
});

test("error state", async () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  store.dispatch(SetError("error message"));

  const meta = store.getState().meta;
  const error = getByText("something went wrong sorry");

  expect(meta.status).toBe("error");
  expect(meta.error).toBe("error message");
  expect(error).toBeInTheDocument();
});

test("Ready state", async () => {
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const input = getByLabelText("Search Twitter");
  const clear = getByText("Clear");
  const submit = getByText("Search!");

  fireEvent.change(input, { target: { value: "This is a test" } });

  store.getState().search.query;
  expect(store.getState().search.query).toBe("This is a test");

  fireEvent.click(clear);
  expect(store.getState().search.query).toBe("");

  fireEvent.click(submit);
  expect(store.getState().meta.status).toBe("ready");
});
