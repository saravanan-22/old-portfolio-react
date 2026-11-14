import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { navItems } from "./data/site";

describe("App", () => {
  it("renders every navigable section with a heading", () => {
    sessionStorage.setItem("intro-seen", "1");
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: "Saravanan" })).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const { id, label } of navItems) {
      expect(within(nav).getByRole("link", { name: new RegExp(label) })).toHaveAttribute(
        "href",
        `#${id}`,
      );
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it("shows the intro once, then remembers it for the session", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { unmount } = render(<App />);
    expect(screen.getByText(/press any key to skip/i)).toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(3000));
    expect(sessionStorage.getItem("intro-seen")).toBe("1");
    unmount();

    render(<App />);
    expect(screen.queryByText(/press any key to skip/i)).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("skips the intro on key press", async () => {
    render(<App />);
    await userEvent.keyboard("{Enter}");
    expect(sessionStorage.getItem("intro-seen")).toBe("1");
  });
});
