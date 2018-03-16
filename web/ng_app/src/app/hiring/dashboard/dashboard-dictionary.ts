import { DashboardDictionaryInterface } from "./dashboard-dictionary.interface";

export const HiringDashboard: DashboardDictionaryInterface = {
  signal: {
    heading: "Signal Collection In progress",
    content: `We are hard at work collecting signals from your exemplar employees and will
        notify you when all signals are complete and ready for action. Invite
        applicants to build a signal profile.`
  },
  exemplar: {
    heading: "Exemplar Signals Collected",
    content: `You work with some great people! We just got to know the exemplar
        employees you connected us with and we are hard at work in search of the
        top applicants for you. Check back soon, we’ll have some matches just for you!`
  },
  success: {
    heading: "Signal Match Success",
    content: `Hooray! We are happy to help you find your next colleague. You’ve got
        applicants that are sourced to fit your requirements, click below to see them.`
  },
  slides: [
    {
      heading: "Your Opportunity listings",
      content: "This is your pipeline of available opportunities"
    },
    {
      heading: "Exemplar + Applicant Status",
      content: `Exemplar status let’s you know when we’ve collected enough signal data to make a sourcing fit.
            Applicant status shows how many of your invited applicants have completed their profile.`
    },
    {
      heading: "Signal Matches",
      content:
        "Once exemplar signal data is collected  we use those signals to map and recommend optimal applicant matches to you!"
    },
    {
      heading: "Get all the Details",
      content: "Click on the view icon to browse your recommended matches"
    },
    {
      heading: "Build your Signal Profile",
      content: `Help us understand your requirements and organization at a deeper
            level by filling out your signal profile at any time`
    },
    {
      heading: "Let’s Get Started",
      content:
        "Invite your exemplar employees and job applicants and we’ll get to work collecting signal data!"
    }
  ]
};
