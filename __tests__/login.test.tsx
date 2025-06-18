import apiService from "@/api";
import loginResponse1 from "../__fixtures__/loginResponse1";
import { render } from "@testing-library/react";
import LoginForm from "@/pages/login/components/LoginForm";

jest.mock("@/api", () => ({
  __esModule: true,
  default: {
    account: {
      login: jest.fn(),
    },
  },
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const mockedApiService = jest.mocked(apiService, { shallow: false });

describe("Login Page", () => {
  beforeEach(async () => {
    const fetchLoginPromise = Promise.resolve(loginResponse1);

    mockedApiService.account.login.mockImplementationOnce(
      () => fetchLoginPromise
    );
  });
  it("should call apiService.account.login", () => {
    render(<LoginForm />);
    expect(apiService.account.login).toHaveBeenCalledTimes(1);
  });
});
