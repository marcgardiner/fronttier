interface Slide {
    heading: string;
    content: string;
}
export interface DashboardDictionaryInterface {
    slides: Slide[];
    signal: {
        heading: string,
        content: string
    };
    exempler: {
        heading: string,
        content: string
    };
    success: {
        heading: string,
        content: string
    };
}
