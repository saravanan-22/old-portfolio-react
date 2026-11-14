import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Contact } from "./Contact";

const sendForm = vi.hoisted(() => vi.fn());
vi.mock("@emailjs/browser", () => ({ sendForm }));

async function fillAndSubmit() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Name"), "Ada");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(screen.getByLabelText("Message"), "Hello there");
  await user.click(screen.getByRole("button", { name: /send message/i }));
}

describe("Contact form", () => {
  beforeEach(() => {
    sendForm.mockReset();
  });

  it("sends the form via EmailJS, shows success and clears the fields", async () => {
    sendForm.mockResolvedValue({ status: 200, text: "OK" });
    render(<Contact />);
    await fillAndSubmit();

    expect(await screen.findByText(/message has been sent/i)).toBeInTheDocument();
    expect(sendForm).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(HTMLFormElement),
      { publicKey: expect.any(String) },
    );
    expect(screen.getByLabelText("Name")).toHaveValue("");
  });

  it("shows an error and keeps the input when sending fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    sendForm.mockImplementation(async () => {
      throw new Error("network");
    });
    render(<Contact />);
    await fillAndSubmit();

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("Ada");
  });

  it("does not submit when required fields are empty", async () => {
    render(<Contact />);
    await userEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(sendForm).not.toHaveBeenCalled();
  });
});
