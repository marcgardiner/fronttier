class Environment(object):
    def __init__(self, name, domain):
        self.name = name
        self.domain = domain

    def is_dev(self):
        return self.name == 'dev'


DEV = Environment('dev', 'localhost')
