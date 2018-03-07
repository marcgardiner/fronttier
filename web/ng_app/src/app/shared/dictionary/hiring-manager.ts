import { UserDictionaryInterface } from './user-dictionary.interface';

export const HiringManager: UserDictionaryInterface = {
    auth: {
        login_message: 'Welcome to Frontier Signal – Your Job Fit  Platform.'
    },
    landing_page: {
        title: '',
        messages: [
            `Let’s get started identifying the success signals for your open job opportunities.
        The Signal Profile is the core of the Frontier Signal matching process.
        Companies signal what they need and individuals signal who they are to make an authentic connection.`,
            'Approximately 20 minutes of your time is needed. Click below when you are ready to start.'
        ]
    },
    survey_complete: {
        messages: [`Thank you for completing the Signal Profile!
        Once your team has completed their Signal Profiles you will receive a Job Signal Report
        that illustrates the success signals for that role.  We will filter and recommend qualified
        candidates based on the success signals in the report.`]
    }
};
