import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const selectedLocale = locale || "en";

  return {
    locale: selectedLocale,
    messages: (await import(`../i18n/${selectedLocale}.json`)).default,
  };
});
