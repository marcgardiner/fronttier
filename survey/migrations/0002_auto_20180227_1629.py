# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-02-27 16:29
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('business', '0002_auto_20180227_1629'),
        ('survey', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='hiring_managers',
            field=models.ManyToManyField(related_name='jobs', to='business.HiringManager'),
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
