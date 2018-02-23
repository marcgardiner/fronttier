import { Injectable } from '@angular/core';

export interface Segment {
    type: number;
    total: number;
    completed: number;
}

@Injectable()
export class SegmentService {

    segment: Segment;

    constructor() {
    }


}
