# Generated by Django 2.2.11 on 2020-11-10 12:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0012_auto_20201107_1643'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usercomment',
            old_name='movie_id',
            new_name='movie',
        ),
        migrations.RenameField(
            model_name='usercomment',
            old_name='user_id',
            new_name='user',
        ),
    ]
