import { Injectable } from '@angular/core';
import { MultiSelect } from '../question/question-types/components/question-multiselect/question-multiselect.component';
import { Question } from '../question/question-types/models/questions';
import { SingleSelect } from '../question/question-types/components/question-singleselect/question-singleselect.component';
import { TextField } from '../question/question-types/components/question-text/question-text.component';
// tslint:disable-next-line:max-line-length
import { DropDownSingleSelect } from '../question/question-types/components/question-dropdown-singleselect/question-dropdown-singleselect.component';
import { LimitedSelect } from '../question/question-types/components/question-limitedselect/question-limitedselect.component';
import { ReOrder } from '../question/question-types/components/question-reorder/question-reorder.component';
import { MultipleTextField } from '../question/question-types/components/question-multiple-text/question-multiple-text.component';
import { DragDrop } from '../question/question-types/components/question-dragdrop/question-dragdrop.component';
import { RankOrder } from '../question/question-types/components/question-rankorder/question-rankorder.component';
import { TypeAhead } from '../question/question-types/components/question-typeahead/question-typeahead.component';

@Injectable()
export class QuestionFieldService {
    public questionsArr: Question[] = [
        new TypeAhead({
            questionLabel: `As of right now, for your career in the United States,
            please enter the top two cities in which you would like to have a job.`,
            options: [
                {
                    label: 'City and State #1', values: [
                    ]
                },
                {
                    label: 'City and State #2', values: [
                        'New York, New York',
                        'Brooklyn, New York',
                        'Bronx, New York',
                        'Staten Island, New York',
                        'Jersey City, New York'
                    ]
                }
            ]
        }),
        new RankOrder({
            questionLabel: `Below is a list of tasks, the approximate length of each task,
            the due date for each task, and the people to whom you should send each completed task.
            Assuming it is the morning of your workday, please rank the independent tasks in the order that you would do them.`,
            description: `1 = the first task and 6 = the last task. Use all given information to inform your ranking.`,
            options: [
                {
                    task: `Send materials to be reviewed for a meeting in three days`,
                    duration: `10 minutes`,
                    duedate: `Before the meeting`,
                    submittedto: `Your direct boss`
                },
                {
                    task: `Proof-read a ten page report`,
                    duration: `2 hours`,
                    duedate: `By the following morning`,
                    submittedto: `Your direct boss`
                },
                {
                    task: `Make a few materials for another department`,
                    duration: `3 hours`,
                    duedate: `Sometime within the next week`,
                    submittedto: `Your colleague`
                },
                {
                    task: `Send an email confirming a meeting for the late afternoon that day.`,
                    duration: `10 minutes`,
                    duedate: `Before the late afternoon`,
                    submittedto: `Your colleague`
                },
                {
                    task: `	Organize your many files, which are getting jumbled`,
                    duration: `30 minutes`,
                    duedate: `No fixed time`,
                    submittedto: `Yourself`
                },
                {
                    task: `	Begin collecting resources for your next project. This project will begin after submitting
                    your current report tomorrow morning.`,
                    duration: `Ongoing and takes many hours`,
                    duedate: `No fixed time, ongoing`,
                    submittedto: `Yourself`
                }
            ]
        }),
        new DragDrop({
            questionLabel: `Please identify the top four values that are most important to you in your daily life.`,
            options: [
                {
                    heading: `Authority`,
                    description: `having a prestigious, central position`
                },
                {
                    heading: `Achievement`,
                    description: `achieving success, according to societal measures`
                },
                {
                    heading: `Indulgence`,
                    description: `luxury and extravagance`
                },
                {
                    heading: `Stimulation`,
                    description: `change and excitement`
                },
                {
                    heading: `Self-Direction`,
                    description: `the liberty to create and explore independently`
                },
                {
                    heading: `Universalism`,
                    description: `the acceptance of all people and nature`
                },
                {
                    heading: `Benevolence`,
                    description: `kindness to others`
                },
                {
                    heading: `Tradition`,
                    description: `spiritual and cultural customs`
                },
                {
                    heading: `Conformity`,
                    description: `adhering to societal norms`
                },
                {
                    heading: `Security`,
                    description: `consistency in your life`
                }
            ],
            answersLimit: 4
        }),
        new MultipleTextField({
            questionLabel: `In your life, think of one person who has been an important mentor to you.
            Please state your relationship with this person. Then, state two to four of this person's qualities
            that made you look up to him/her and write a sentence for each quality explaining why that quality
            made you look up to this person in your life.`,
            description: 'Please use complete sentences when writing explanations',
            options: [
                {
                    label: `group`, fields: [
                        {
                            label: `Relationship to selected person`,
                            disabled: false
                        }
                    ]
                },
                {
                    label: `group`, fields: [
                        {
                            label: `Quality #1`,
                            disabled: false
                        },
                        {
                            label: `Explanation #1`,
                            disabled: false
                        }
                    ]
                },
                {
                    label: `group`, fields: [
                        {
                            label: `Quality #2`,
                            disabled: false
                        },
                        {
                            label: `Explanation #2`,
                            disabled: false
                        }
                    ]
                },
                {
                    label: `group`, fields: [
                        {
                            label: `Quality #3`,
                            disabled: true
                        },
                        {
                            label: `Explanation #3`,
                            disabled: true
                        }
                    ]
                },
                {
                    label: `group`, fields: [
                        {
                            label: `Quality #4`,
                            disabled: true
                        },
                        {
                            label: `Explanation #4`,
                            disabled: true
                        }
                    ]
                }
            ]
        }),
        new ReOrder({
            questionLabel: `In general, what would get you energized to go to work every day?
            Please rank order the items listed below from the most energizing (1) to the least energizing (6).`,
            options: [
                {
                    label: `You are passionate about your work`
                },
                {
                    label: `The work itself benefits society`
                },
                {
                    label: `Friendships with coworkers`
                },
                {
                    label: `The potential to earn a big bonus for your hard work`
                },
                {
                    label: `The potential to be promoted`
                },
                {
                    label: `Demands in your personal life that require you to keep your job`
                }
            ]
        }),
        new LimitedSelect({
            questionLabel: `When having a conversation with a person, which non-verbal cues do you look for to know
                that the conversation is becoming tense? From the following choices, please identify the top three clues
                that would characterize any tense conversation.`,
            options: [
                {
                    label: `furrowed eyebrows`
                },
                {
                    label: `sweating`
                },
                {
                    label: `laughter`
                },
                {
                    label: `fidgeting fingers`
                },
                {
                    label: `squinting eyes`
                },
                {
                    label: `sitting-back relaxed`
                },
                {
                    label: `slow, controlled speech`
                },
                {
                    label: `flushed cheeks`
                }
            ]
        }),
        new DropDownSingleSelect({
            questionLabel: `This is a question about skills and experience – select your preferred design software in the form below.`,
            options: [
                {
                    label: `Preferred Software`
                },
                {
                    label: `Adobe Photoshop`
                },
                {
                    label: `Illustration`
                },
                {
                    label: `Invision`
                },
                {
                    label: `Principle`
                },
                {
                    label: `Sketch`
                },
                {
                    label: `Sketch`
                }
            ]
        }),
        new MultiSelect({
            questionLabel: `You attended a meeting in which one of your colleagues, who is an acquaintance of yours,
                has just given a presentation. You thought your colleague gave a great presentation, but you feel hurried
                to get back to the task you began before the meeting.
                What do you do at the end of the meeting?`,
            options: [
                {
                    label: `You quickly go back to your desk, send your colleague a short e-mail,
                        complimenting him/her on his/her presentation, and after,
                        return to the task you began before the meeting.`, value: 'answer1'
                },
                {
                    label: `You take a few minutes to tell your colleague in person you thought that
                        he/she gave a great presentation.`,
                    value: 'answer2'
                },
                {
                    label: `You return to your desk to complete the task you began before the meeting. After finishing the task,
                        you send your colleague an e-mail, complimenting him/her on his/her presentation.`, value: 'answer3'
                },
                {
                    label: `At the end of the meeting, on your way out, you tell your colleague he/she did a great job on the
                        presentation and then return to the task you began before the meeting.`, value: 'answer3'
                },
            ]
        }),
        new SingleSelect({
            questionLabel: `Please rate how strongly you agree or disagree with the following statements about your work`,
            options: [
                {
                    label: 'I feel I have controll over my work.'
                },
                {
                    label: 'I feel that my work is valued by the company.'
                },
                {
                    label: 'I feel I have controll over my work.'
                }
            ]
        }),
        new TextField({
            questionLabel: `How would you describe successful teamwork? You can describe teamwork in either a workplace or
                school setting.`,
            description: `Your answer should be about one paragraph composed of at least 5 complete sentences.`,
        })
    ];

    getQuestion(index: number): Question {
        if (this.questionsArr.length < index) {
            return null;
        }
        window.localStorage.setItem('index', index.toString());
        return this.questionsArr[index];
    }
}
