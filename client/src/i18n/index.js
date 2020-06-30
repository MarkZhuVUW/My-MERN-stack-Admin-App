import chinese from "i18n/chinese";
import en from "i18n/en";
import _get from "lodash/get";

let currentLanguageCode = null;

const languages = {
  en: {
    id:
      "en",
    label:
      "en",
    flag:
      "/images/flags/24/United-States.png",
    dictionary: en,
  },
  chinese: {
    id:
      "chinese",
    label:
      "chinese",
    flag:
      "/images/flags/24/Brazil.png",
    dictionary: chinese,
  },
};

export const setLanguageCode = (
  arg,
) => {
  if (
    !languages[
      arg
    ]
  ) {
    throw new Error(
      `Invalid language ${arg}.`,
    );
  }

  localStorage.setItem(
    "language",
    arg,
  );
};

const init = () => {
  currentLanguageCode =
    localStorage.getItem(
      "language",
    ) ||
    "en";
  setLanguageCode(
    currentLanguageCode,
  );
};

export const getLanguageCode = () => {
  if (
    !currentLanguageCode
  ) {
    init();
  }

  return currentLanguageCode;
};
const getLanguage = () =>
  languages[
    getLanguageCode()
  ];

const format = (
  message,
  args,
) => {
  if (
    !message
  ) {
    return null;
  }

  try {
    return message.replace(
      /{(\d+)}/g,
      (
        match,
        number,
      ) =>
        typeof args[
          number
        ] !==
        "undefined"
          ? args[
              number
            ]
          : match,
    );
  } catch (error) {
    console.error(
      message,
      error,
    );
    throw error;
  }
};

export const i18n = (
  key,
  ...args
) => {
  const message = _get(
    getLanguage()
      .dictionary,
    key,
  );

  if (
    !message
  ) {
    return key;
  }

  return format(
    message,
    args,
  );
};
