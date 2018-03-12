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
    },
    slides: [
        {
            heading: 'Your Opportunity listings',
            content: 'This is your pipeline of available opportunities'
        },
        {
            heading: 'Exemplar + Applicant Status',
            content: `Exemplar status let’s you know when we’ve collected their signal data and applicant
            status shows how many of your invited applicants have completed their profile.`
        },
        {
            heading: 'Signal Matches',
            content: 'Once we collect all your exemplar data we use those signals to map and recommend optimal applicant matches to you!'
        },
        {
            heading: 'Get all the Details',
            content: 'Dig deeper into each Opportunity by clicking view to can see your personalized Signal Report and match list'
        },
        {
            heading: 'Build your Signal Profile',
            content: 'Help us understand your organization at a deeper level by filling out your signal profile at any time'
        },
        {
            heading: 'Let’s Get Started',
            content: 'Invite you exemplars and applicants and we’ll get to work collecting signal data!'
        },
    ]
};
