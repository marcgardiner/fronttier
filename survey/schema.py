from survey.models import QuestionTemplate


Type = QuestionTemplate.Type

SIMPLE_ITEMS_ONLY = {
    "type": "object",
    "properties": {
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "value": "string",
                    "key": "string"
                },
                "required": ["value", "key"]
            }
        }
    },
    "required": ["items"]
}

SIMPLE_ITEMS_AND_NUM_ALLOWED = {
    "type": "object",
    "properties": {
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "value": "string",
                    "key": "string"
                },
                "required": ["value", "key"]
            }
        },
        "num_allowed": {
            "type": "integer"
        }
    },
    "required": ["items", "num_allowed"]
}

QUESTION_SCHEMA = {
    Type.MULTI_CHOICE_MULTI_SELECT: SIMPLE_ITEMS_AND_NUM_ALLOWED,
    Type.MULTI_CHOICE_SINGLE_SELECT: SIMPLE_ITEMS_ONLY,
    Type.OPEN_ENDED_PARAGRAPH: {
        "type": "object",
        "properties": {}
    },
    Type.OPEN_ENDED_MULTI_FIELDS: {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "value": "string",
                        "key": "string",
                        "optional": "boolean"
                    },
                    "required": ["value", "key"]
                }
            }
        },
        "required": ["items"]
    },
    Type.REORDER: SIMPLE_ITEMS_ONLY,
    Type.DRAG_DROP: SIMPLE_ITEMS_AND_NUM_ALLOWED,
    Type.TYPE_AHEAD: {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "value": "string",
                        "key": "string",
                        "type": "string"
                    },
                    "required": ["value", "key", "type"]
                }
            }
        },
        "required": ["items"]
    },
    Type.DROPDOWN: SIMPLE_ITEMS_ONLY,
    Type.RANK_ORDER_TABLE: SIMPLE_ITEMS_ONLY,
    Type.RANK_ORDER_MATRIX: {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "value": "string",
                        "key": "string"
                    },
                    "required": ["value", "key"]
                }
            },
            "choices":{
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "value": "string",
                        "key": "string"
                    },
                    "required": ["value", "key"]
                }
            }
        },
        "required": ["items", "choices"]
    },
}

ANSWER_SCHEMA = {

}