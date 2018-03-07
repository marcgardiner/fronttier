export interface UserDictionaryInterface {
    auth: {
        login_message: string;
    };
    landing_page: {
        title: string,
        messages: string[]
    };
    survey_complete: {
        messages: string[]
    };
}
