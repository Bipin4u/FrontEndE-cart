import { render, screen, waitFor } from "@testing-library/react";
import TestComponent from "./TestComponent";
import axios from "axios";

jest.mock("axios");  // Ensure the mock is used

describe("TestComponent", () => {
  it("fetches and displays data", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { title: "Sample Data" } });

    render(<TestComponent />);

    // Check if "Loading..." text is displayed initially
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for data to be rendered
    await waitFor(() => expect(screen.getByText(/Data: Sample Data/i)).toBeInTheDocument());
  });

  it("displays an error message when fetching fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Fetch error"));

    render(<TestComponent />);

    // Check if "Loading..." text is displayed initially
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the error message to be rendered
    await waitFor(() => expect(screen.getByText(/Error fetching data/i)).toBeInTheDocument());
  });
});
