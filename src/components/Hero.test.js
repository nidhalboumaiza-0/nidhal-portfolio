import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { LanguageProvider } from "../contexts/LanguageContext";
import Hero from "./Hero";

jest.mock("react-typed", () => ({ ReactTyped: () => null }));

const theme = {
  colors: { primary: "#8b5cf6", text: "#fff", textSecondary: "#aaa" },
  fonts: { mono: "monospace" },
  breakpoints: { mobile: "768px", tablet: "1024px" },
};

function openCv() {
  const view = render(
    <ThemeProvider theme={theme}>
      <LanguageProvider><Hero /></LanguageProvider>
    </ThemeProvider>
  );
  const trigger = screen.getByRole("button", { name: "Download CV" });
  trigger.focus();
  fireEvent.click(trigger);
  return { ...view, trigger, dialog: screen.getByRole("dialog") };
}

test("CV is portaled outside the hero and all PDF actions are preserved", () => {
  const { container, dialog } = openCv();
  expect(container).not.toContainElement(dialog);
  expect(dialog.parentElement.parentElement).toBe(document.body);
  expect(dialog).toHaveAccessibleName("Download CV");
  const downloads = within(dialog).getAllByRole("link", { name: "Download (PDF)" });
  expect(downloads).toHaveLength(4);
  expect(within(dialog).getAllByRole("link", { name: "Preview" })).toHaveLength(4);
  downloads.forEach((link) => {
    expect(link).toHaveAttribute("href", `/${link.getAttribute("download")}`);
  });
});

test("CV traps focus, closes with Escape, and restores focus and scrolling", async () => {
  document.body.style.overflow = "auto";
  const { trigger, dialog } = openCv();
  const close = within(dialog).getByRole("button", { name: "Close CV" });
  const last = within(dialog).getAllByRole("link", { name: "Preview" }).pop();
  expect(close).toHaveFocus();
  expect(document.body.style.overflow).toBe("hidden");
  fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
  expect(last).toHaveFocus();
  fireEvent.keyDown(last, { key: "Tab" });
  expect(close).toHaveFocus();
  fireEvent.keyDown(close, { key: "Escape" });
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
  expect(document.body.style.overflow).toBe("auto");
  document.body.style.overflow = "";
});

test("only clicking the backdrop dismisses the CV", async () => {
  const { dialog } = openCv();
  fireEvent.click(within(dialog).getByRole("heading", { name: "Download CV" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.click(dialog.parentElement);
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("unmounting an open CV restores body scrolling", () => {
  document.body.style.overflow = "scroll";
  const { unmount } = openCv();
  unmount();
  expect(document.body.style.overflow).toBe("scroll");
  document.body.style.overflow = "";
});
