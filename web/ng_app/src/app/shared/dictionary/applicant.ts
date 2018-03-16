import { UserDictionaryInterface } from "./user-dictionary.interface";

export const Applicant: UserDictionaryInterface = {
  auth: {
    login_message: "Welcome to Frontier Signal – Your Job Fit Platform."
  },
  landing_page: {
    title: "to next step in the application process!",
    messages: [
      `The Signal Profile is the core of the Frontier Signal matching process.
    Companies signal what they need and individuals signal who they are to make an authentic connection.`,
      `If this opportunity is a match for you, you will be contacted.`,
      `Approximately 20 minutes of your time is needed.
    We recommend that you clear away any distractions and click below when you are ready to start.`
    ]
  },
  survey_complete: {
    messages: [
      `Thank you for completing the Signal Profile for the (insert job role) position at (insert company name).`,
      `If you are a match you will be contacted soon!`,
      `To learn more about how to get qualified opportunities that are a fit to your requirements click on FrontierSignal.com`
    ]
  }
};
