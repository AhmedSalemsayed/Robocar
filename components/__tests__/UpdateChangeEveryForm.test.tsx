import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UpdateChangeEveryForm from "../UpdateChangeEveryForm";
import { updateChangeEvery } from "@/lib/serverUtils";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import userEvent from "@testing-library/user-event";

// Mock dependencies
jest.mock("@/lib/serverUtils", () => ({
  updateChangeEvery: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("lucide-react", () => ({
  Gauge: () => <div data-testid="gauge-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
  Info: () => <div data-testid="info-icon" />,
}));

jest.mock("../ui/card", () => ({
  Card: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
}));

jest.mock("../ui/separator", () => ({
  Separator: ({ className }: any) => <hr className={className} />,
}));

jest.mock("../SubmitButton", () => {
  return function MockSubmitButton({
    isSubmitting,
  }: {
    isSubmitting: boolean;
  }) {
    return (
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    );
  };
});

describe("UpdateChangeEveryForm", () => {
  const mockSetOpen = jest.fn();
  const mockRowData = {
    currentKilometrage: 20000,
    changeEvery: 5000,
    name: "Oil Change",
    class: "Engine",
    historyLog: [],
  } as rowData;

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({
      carId: "car-123",
    });
  });

  it("renders input with default value", () => {
    render(
      <UpdateChangeEveryForm setOpen={mockSetOpen} rowData={mockRowData} />,
    );
    expect(
      screen.getByPlaceholderText(/enter new interval in kilometers/i),
    ).toHaveValue(5000);
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("submits new value", async () => {
    const user = userEvent.setup();
    render(
      <UpdateChangeEveryForm setOpen={mockSetOpen} rowData={mockRowData} />,
    );

    const input = screen.getByPlaceholderText(/enter new interval in kilometers/i);
    await user.clear(input);
    await user.type(input, "6000");
    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(updateChangeEvery).toHaveBeenCalledWith(
        "Oil Change",
        "car-123",
        6000,
      );
    });

    expect(mockSetOpen).toHaveBeenCalledWith(false);
    expect(toast.success).toHaveBeenCalled();
  });

  it("handles error on submit", async () => {
    const user = userEvent.setup();
    (updateChangeEvery as jest.Mock).mockRejectedValue(
      new Error("Update failed"),
    );

    render(
      <UpdateChangeEveryForm setOpen={mockSetOpen} rowData={mockRowData} />,
    );

    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Update failed");
    });
  });
});
