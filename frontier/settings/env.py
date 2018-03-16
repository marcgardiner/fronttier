class Environment(object):
    def __init__(self, name, host):
        self.name = name
        self.host = host

    def is_dev(self):
        return self.name in ('dev', 'test')


DEV = Environment('dev', 'http://localhost:8000')
CI = Environment('ci', 'http://localhost:8000')
PROD = Environment('prod', 'https://frontier-web.herokuapp.com')
