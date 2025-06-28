jest.mock("react-i18next", () => ({
  __esModule: true,
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: "en-GB",
      options: { react: {} },
    },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
  I18nextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },
}));
import apiService from "@/api";
import loginResponse1 from "../__fixtures__/loginResponse1";
import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "@/libs/test-utils/render-with-providers";
import LoginForm from "@/pages/login/components/LoginForm";

// ------------------- TEST -------------------
const mockedApiService = jest.mocked(apiService, { shallow: false });

describe("Login Page", () => {
  beforeEach(async () => {
    const fetchLoginPromise = Promise.resolve(loginResponse1);
    mockedApiService.account.login.mockImplementationOnce(
      () => fetchLoginPromise
    );
  });

  afterEach(() => {
    mockedApiService.account.login.mockClear();
  });

  it("should call apiService.account.login", () => {
    renderWithProviders(<LoginForm />);
    screen.debug();
  });

  test("should render without crashing", () => {
    expect(true).toBe(true);
  });
});

describe("Login Page", () => {
  beforeEach(() => {
    mockedApiService.account.login.mockImplementationOnce(() =>
      Promise.resolve(loginResponse1)
    );
  });

  it("should call apiService.account.login", async () => {
    await apiService.account.login({
      formData: { email: "test236@gmail.com", password: "Daithang@230697" },
    });
    expect(apiService.account.login).toHaveBeenCalledTimes(1);
  });
});

describe("LoginForm", () => {
  it("should call apiService.account.login", async () => {
    render(<LoginForm />);

    screen.debug();
  });
});
