import i18n from "@/libs/i18n/i18n";
import { ReduxProvider } from "@/libs/redux/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ReduxProvider>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={new QueryClient()}>
          {ui}
        </QueryClientProvider>
      </I18nextProvider>
    </ReduxProvider>
  );
};
