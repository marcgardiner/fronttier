import { UserDictionaryInterface } from "./user-dictionary.interface";

export const Exemplar: UserDictionaryInterface = {
  auth: {
    login_message:
      "Welcome to Frontier Signal – Welcome to Frontier Signal – Assist your company in finding optimal candidates."
  },
  landing_page: {
    title: "",
    messages: [
      "Congratulations on your selection to assist you company in identifying job success signals.  Your contribution is vital!",
      `The Signal Profile is the core of the Frontier Signal’s matching process.
        Companies signal what they need and individuals signal who they are to make an authentic connection`,
      `Approximately 20 minutes of your time is needed.
    We recommend that you clear away any distractions and click below when you are ready to start.
    `
    ]
  },
  survey_complete: {
    messages: [
      `Thank you for completing the Signal Profile!
        Your participation helped your company identify job success signals. Well Done.
        `
    ]
  }
};
