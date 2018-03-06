# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-03-06 15:09
from __future__ import unicode_literals

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion
import django.utils.crypto
import frontier.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('business', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(default=django.utils.crypto.get_random_string, max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(db_index=True, default=False)),
                ('storytime', models.TextField(blank=True, null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('data', django.contrib.postgres.fields.jsonb.JSONField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(default=django.utils.crypto.get_random_string, max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(db_index=True, default=False)),
                ('storytime', models.TextField(blank=True, null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('type', models.CharField(choices=[('intern', 'Intern'), ('full_time', 'Full-time'), ('part_time', 'Part-time'), ('contractor', 'Contractor')], max_length=16)),
                ('level', models.CharField(choices=[('entry', 'Entry'), ('mid', 'Mid'), ('senior', 'Senior')], max_length=16)),
                ('status', models.CharField(choices=[('open', 'Open'), ('closed', 'Closed')], default='open', max_length=16)),
                ('title', models.CharField(max_length=128)),
                ('description', models.TextField(blank=True, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to='business.Company')),
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
                ('token', models.CharField(default=django.utils.crypto.get_random_string, max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(db_index=True, default=False)),
                ('storytime', models.TextField(blank=True, null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
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
                ('token', models.CharField(default=django.utils.crypto.get_random_string, max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(db_index=True, default=False)),
                ('storytime', models.TextField(blank=True, null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('name', models.CharField(max_length=64, unique=True)),
                ('type', models.CharField(choices=[('multi_choice_multi_select', 'Multiple Choice Multiple Select'), ('multi_choice_single_select', 'Multiple Choice Single Select'), ('open_ended_paragraph', 'Open-ended Paragraph'), ('open_ended_multi_fields', 'Open-ended Multiple Fields'), ('reorder', 'Reorder'), ('drag_drop', 'Drag & Drop'), ('type_ahead', 'Type Ahead'), ('dropdown', 'Dropdown'), ('rank_order_table', 'Rank Order Table'), ('rank_order_matrix', 'Rank Order Matrix')], max_length=16)),
                ('prompt', models.TextField()),
                ('note', models.TextField(blank=True, null=True)),
                ('data', django.contrib.postgres.fields.jsonb.JSONField(default={})),
            ],
            options={
                'verbose_name': 'Question Template',
                'verbose_name_plural': 'Question Templates',
            },
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(default=django.utils.crypto.get_random_string, max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(db_index=True, default=False)),
                ('storytime', models.TextField(blank=True, null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('expiration_time', models.IntegerField()),
                ('type', models.CharField(choices=[('hiring_manager', 'Hiring Manager'), ('exemplar', 'Exemplar'), ('candidate', 'Candidate')], max_length=16)),
                ('version', models.IntegerField(default=1)),
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
                ('token', models.CharField(default=django.utils.crypto.get_random_string, max_length=32, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('disabled', models.BooleanField(db_index=True, default=False)),
                ('storytime', models.TextField(blank=True, null=True)),
                ('metadata', django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True)),
                ('survey', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='survey.Survey')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='survey_responses', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Survey Response',
                'verbose_name_plural': 'Survey Responses',
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
    ]
