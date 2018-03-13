from survey.models import QuestionTemplate


Type = QuestionTemplate.Type


SIMPLE_ITEMS_ONLY = {
    'type': 'object',
    'properties': {
        'items': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'value': {
                        'type': 'string',
                    },
                    'key': {
                        'type': 'string',
                    }
                },
                'required': ['value', 'key']
            }
        }
    },
    'required': ['items']
}

SIMPLE_ITEMS_AND_NUM_ALLOWED = {
    'type': 'object',
    'properties': {
        'items': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'value': {
                        'type': 'string',
                    },
                    'key': {
                        'type': 'string',
                    }
                },
                'required': ['value', 'key']
            }
        },
        'num_allowed': {
            'type': 'integer'
        }
    },
    'required': ['items', 'num_allowed']
}

QUESTION_SCHEMA = {
    Type.MULTI_CHOICE_MULTI_SELECT: SIMPLE_ITEMS_AND_NUM_ALLOWED,
    Type.MULTI_CHOICE_SINGLE_SELECT: SIMPLE_ITEMS_ONLY,
    Type.OPEN_ENDED_PARAGRAPH: {
        'type': 'object',
        'properties': {}
    },
    Type.OPEN_ENDED_MULTI_FIELDS: {
        'type': 'object',
        'properties': {
            'items': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'value': {
                            'type': 'string',
                        },
                        'key': {
                            'type': 'string',
                        },
                        'optional': {
                            'type': 'boolean'
                        }
                    },
                    'required': ['value', 'key']
                }
            }
        },
        'required': ['items']
    },
    Type.REORDER: SIMPLE_ITEMS_ONLY,
    Type.DRAG_DROP: SIMPLE_ITEMS_AND_NUM_ALLOWED,
    Type.TYPE_AHEAD: {
        'type': 'object',
        'properties': {
            'items': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'value': {
                            'type': 'string',
                        },
                        'key': {
                            'type': 'string',
                        },
                        'type': {
                            'type': 'string'
                        }
                    },
                    'required': ['value', 'key', 'type']
                }
            }
        },
        'required': ['items']
    },
    Type.DROPDOWN: SIMPLE_ITEMS_ONLY,
    Type.RANK_ORDER_TABLE: SIMPLE_ITEMS_ONLY,
    Type.RANK_ORDER_MATRIX: {
        'type': 'object',
        'properties': {
            'items': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'value': {
                            'type': 'string',
                        },
                        'key': {
                            'type': 'string',
                        }
                    },
                    'required': ['value', 'key']
                }
            },
            'choices': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'value': {
                            'type': 'string',
                        },
                        'key': {
                            'type': 'string',
                        }
                    },
                    'required': ['value', 'key']
                }
            }
        },
        'required': ['items', 'choices']
    },
}


SINGLE_ANSWER = {
    'type': 'object',
    'properties': {
        'response': {
            'type': 'object',
            'properties': {
                'key': {
                    'type': 'string',
                }
            },
            'required': ['key']
        }
    },
    'required': ['response']
}


MULTIPLE_ANSWER = {
    'type': 'object',
    'properties': {
        'response': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'key': {
                        'type': 'string',
                    }
                },
                'required': ['key']
            }
        }
    },
    'required': ['response']
}


MULTIPLE_ANSWER_FREE_FORM = {
    'type': 'object',
    'properties': {
        'response': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'key': {
                        'type': 'string',
                    },
                    'value': {
                        'type': 'string'
                    }
                },
                'required': ['key', 'value']
            }
        }
    },
    'required': ['response']
},


ANSWER_SCHEMA = {
    Type.MULTI_CHOICE_MULTI_SELECT: MULTIPLE_ANSWER,
    Type.MULTI_CHOICE_SINGLE_SELECT: SINGLE_ANSWER,
    Type.OPEN_ENDED_PARAGRAPH: {
        'type': 'object',
        'properties': {
            'response': {
                'type': 'string'
            }
        },
        'required': ['response']
    },
    Type.OPEN_ENDED_MULTI_FIELDS: MULTIPLE_ANSWER_FREE_FORM,
    Type.REORDER: MULTIPLE_ANSWER,
    Type.DRAG_DROP: MULTIPLE_ANSWER,
    Type.TYPE_AHEAD: MULTIPLE_ANSWER_FREE_FORM,
    Type.DROPDOWN: SINGLE_ANSWER,
    Type.RANK_ORDER_TABLE: MULTIPLE_ANSWER,
    Type.RANK_ORDER_MATRIX: MULTIPLE_ANSWER,
}
