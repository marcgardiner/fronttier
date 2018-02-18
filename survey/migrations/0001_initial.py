# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-02-18 05:13
from __future__ import unicode_literals

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion
import frontier.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('business', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(default=True)),
                ('storytime', models.TextField(null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('data', django.contrib.postgres.fields.jsonb.JSONField(default={})),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(default=True)),
                ('storytime', models.TextField(null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('type', models.CharField(choices=[(b'intern', b'intern'), ('full time', 'full time'), ('part time', 'part time'), (b'contractor', b'contractor')], max_length=16)),
                ('level', models.CharField(choices=[(b'entry', b'entry'), (b'mid', b'mid'), (b'senior', b'senior')], max_length=16)),
                ('status', models.CharField(choices=[(b'open', b'open'), (b'closed', b'closed')], default=b'open', max_length=16)),
                ('title', models.CharField(max_length=128)),
                ('description', models.TextField(blank=True, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to='business.Company')),
                ('hiring_managers', models.ManyToManyField(related_name='jobs', to='business.HiringManager')),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model, frontier.models.LocationFields),
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(default=True)),
                ('storytime', models.TextField(null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('segment', models.IntegerField()),
                ('index', models.IntegerField()),
                ('context', django.contrib.postgres.fields.jsonb.JSONField(default={})),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='QuestionTemplate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(default=True)),
                ('storytime', models.TextField(null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('type', models.CharField(choices=[('multiple choice multi select', 'multiple choice multi select'), ('multiple choice single select', 'multiple choice single select'), ('open ended paragraph', 'open ended paragraph'), ('open ended multi fields', 'open ended multi fields'), (b'reorder', b'reorder'), ('drag drop', 'drag drop'), ('type ahead', 'type ahead'), ('drop down', 'drop down'), ('rank order table', 'rank order table'), ('rank order matrix', 'rank order matrix')], max_length=16)),
                ('prompt', models.TextField()),
                ('note', models.TextField()),
                ('data', django.contrib.postgres.fields.jsonb.JSONField(default={})),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(default=True)),
                ('storytime', models.TextField(null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('expiration_time', models.IntegerField()),
                ('type', models.CharField(choices=[('hiring manager', 'hiring manager'), (b'exemplar', b'exemplar'), (b'candidate', b'candidate')], max_length=16)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='surveys', to='survey.Job')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SurveyResponse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(default=True)),
                ('storytime', models.TextField(null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(null=True)),
                ('survey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='survey.Survey')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='survey_responses', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='question',
            name='survey',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='survey.Survey'),
        ),
        migrations.AddField(
            model_name='question',
            name='template',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='survey.QuestionTemplate'),
        ),
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='survey.Question'),
        ),
        migrations.AddField(
            model_name='answer',
            name='survey_response',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='survey.SurveyResponse'),
        ),
    ]
