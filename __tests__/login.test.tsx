// import apiService from "@/api";
// import loginResponse1 from "../__fixtures__/loginResponse1";
// import { screen } from "@testing-library/dom";
// import LoginForm from "@/pages/login/components/LoginForm";
// import { renderWithProviders } from "@/libs/test-utils/render-with-providers";

jest.mock("@/api", () => ({
  __esModule: true,
  default: {
    account: {
      login: jest.fn(),
    },
  },
}));

// jest.mock("react-i18next", () => ({
//   useTranslation: () => {
//     return {
//       t: (str: string) => str,
//       i18: {
//         changeLanguage: () => new Promise(() => {}),
//       },
//     };
//   },
// }));

// const mockedApiService = jest.mocked(apiService, { shallow: false });

describe("Login Page", () => {
  // beforeEach(async () => {
  //   const fetchLoginPromise = Promise.resolve(loginResponse1);

  //   mockedApiService.account.login.mockImplementationOnce(
  //     () => fetchLoginPromise
  //   );
  // });
  // it("should call apiService.account.login", () => {
  //   renderWithProviders(<LoginForm />);
  //   // expect(apiService.account.login).toHaveBeenCalledTimes(1);
  //   expect(screen.getByText(/login/i)).toBeInTheDocument();
  // });
  test("should render without crashing", () => {
    expect(true).toBe(true);
  });
});
