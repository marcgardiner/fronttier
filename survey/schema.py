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
                    "value": "string"
                },
                "required": ["value"]
            }
        }
    }
    "required": ["items"],
}

SIMPLE_ITEMS_AND_NUM_ALLOWED = {
    "type": "object",
    "properties": {
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "value": "string"
                },
                "required": ["value"]
            }
        },
        "num_allowed": {
            "type": "integer"
        }
    },
    "required": ["items", "num_allowed"]
}

QUESTION_SCHEMA = {
    Type.multiple_choice_multi_select: SIMPLE_ITEMS_AND_NUM_ALLOWED,
    Type.multiple_choice_single_select: SIMPLE_ITEMS_ONLY,
    Type.open_ended_paragraph: {
        "type": "object",
        "properties": {}
    },
    Type.open_ended_multi_fields: {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "value": "string",
                        "required": "boolean",
                    },
                    "required": ["value"]
                }
            }
        },
        "required": ["items"]
    },
    Type.reorder: SIMPLE_ITEMS_ONLY,
    Type.drag_drop: SIMPLE_ITEMS_AND_NUM_ALLOWED,
    Type.type_ahead: {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "value": "string",
                        "type": "string",
                    },
                    "required": ["value"]
                }
            }
        },
        "required": ["items"]
    },
    Type.drop_down: SIMPLE_ITEMS_ONLY,
    Type.rank_order_table: SIMPLE_ITEMS_ONLY,
    Type.rank_order_matrix: {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "value": "string"
                    },
                    "required": ["value"]
                }
            },
            "choices":{
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "value": "string"
                    },
                    "required": ["value"]
                }
            }
        },
        "required": ["items", "choices"]
    },
}

ANSWER_SCHEMA = {

}