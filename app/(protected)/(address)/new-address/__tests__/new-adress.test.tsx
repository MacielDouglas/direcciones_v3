import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// import * from "../../components/hooks/useLiveUserLocation"

import NewAddress from "../NewAddress";
import { useFormContext } from "react-hook-form";

/* ─────────────────── MOCKS ─────────────────── */

beforeAll(() => {
  Object.defineProperty(global.navigator, "geolocation", {
    value: {
      getCurrentPosition: jest.fn((success) =>
        success({
          coords: {
            latitude: -8.505039,
            longitude: -35.011394,
          },
        })
      ),
    },
    configurable: true,
  });
});

jest.mock("../../components/AddressFormFields", () => {
  // const { useFormContext } = require("react-hook-form");

  return function AddressFormFieldsMock() {
    const { register } = useFormContext();

    return (
      <>
        <label>
          Rua
          <input aria-label="Rua" {...register("street")} />
        </label>

        <label>
          Número
          <input aria-label="Número" {...register("number")} />
        </label>

        <label>
          Bairro
          <input aria-label="Bairro" {...register("neighborhood")} />
        </label>
        <label>
          Cidade
          <input aria-label="Cidade" {...register("city")} />
        </label>
      </>
    );
  };
});

jest.mock("../../components/AddressLocationDialog", () => {
  return function AddressLocationDialogMock() {
    return <button data-testid="set-location">Definir localização</button>;
  };
});

jest.mock("@/components/Image/ImageUpload", () => ({
  ImageUpload: () => <div data-testid="image-upload" />,
}));

jest.mock("../../components/hooks/useLiveUserLocation", () => ({
  useUserLocation: () => ({
    latitude: -8.505039,
    longitude: -35.011394,
  }),
}));

/* ─────────────────── TEST ─────────────────── */

describe("NewAddress", () => {
  it("cria um endereço completo", async () => {
    const user = userEvent.setup();
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(<NewAddress userId="user-123" organizationId="org4569rtgr@" />);

    await user.type(screen.getByLabelText(/Rua/i), "Rua das Flores");
    await user.type(screen.getByLabelText(/Número/i), "123");
    await user.type(screen.getByLabelText(/Bairro/i), "Centro");
    await user.type(screen.getByLabelText(/Cidade/i), "Peixoto");

    await waitFor(() =>
      expect(screen.getByText(/GPS Lat/i)).toBeInTheDocument()
    );

    const submit = screen.getByRole("button", {
      name: /Confirmar e Enviar/i,
    });

    await waitFor(() => expect(submit).toBeEnabled());

    await user.click(submit);

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith(
        "ENDEREÇO CADASTRADO:",
        expect.objectContaining({
          street: "Rua das Flores",
          number: "123",
          neighborhood: "Centro",
          city: "Peixoto",
          latitude: -8.505039,
          longitude: -35.011394,
          createdUserId: "user-123",
          organizationId: "org4569rtgr@",
        })
      );
    });

    logSpy.mockRestore();
  });
});
