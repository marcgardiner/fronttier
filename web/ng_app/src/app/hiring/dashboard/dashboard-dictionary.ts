import { DashboardDictionaryInterface } from './dashboard-dictionary.interface';

export const HiringDashboard: DashboardDictionaryInterface = {
    signal: {
        heading: 'Signal Collection In progress',
        content: `We are hard at work collecting signals from your exemplars and will notify you
        when all signals are complete and ready for action. Invite applicants to build a
        signal profile.`
    },
    exempler: {
        heading: 'Exemplar Signals Collected',
        content: `You work with some great people! We just got to know your exemplars and
        we are hard at work in search of the top applicants. Check back soon
        and we’ll have some matches just for you!`
    },
    success: {
        heading: 'Signal Match Success',
        content: `Hooray! We are happy to help you find your next colleague. You’ve got
        applicant matches waiting, click below to see them.`
    }
};
