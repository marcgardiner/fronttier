export class Question {
    questionLabel: string;
    component: any;

    constructor(options: {
        questionLabel?: string
    }) {
        if (!options.questionLabel) {
            throw new Error('`questionLabel` is required for FormField object');
        }
        this.questionLabel = options.questionLabel;
    }
}

