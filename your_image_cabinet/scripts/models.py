from peewee import *


DATABASE = SqliteDatabase('cabinet.db')


class Image(Model):
    index = IntegerField(unique=True)
    predicted_description = TextField(null=True)
    url = CharField(null=True)

    class Meta:
        database = DATABASE


class Description(Model):
    image = ForeignKeyField(Image, related_name='descriptions')
    text = TextField()

    class Meta:
        database = DATABASE


def initialize():
    DATABASE.connect()
    DATABASE.create_tables([Image, Description], safe=True)
    DATABASE.close()
